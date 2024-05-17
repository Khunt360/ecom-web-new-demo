import axios from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { toast } from "react-toastify";

export const BASE_URL = "https://infowarescripts.com/dev/e-commerce/";
export const Site_URL = "https://ecom-web-next.vercel.app/";

const instance = axios.create({
  baseURL: BASE_URL + "api/",
});

const onRequestSuccess = (config) => {
  const auth_token = Cookies.get("auth_token");
  if (auth_token) config.headers["Authorization"] = "bearer " + auth_token;

  return config;
};
const onRequestFailure = (error) => Promise.reject(error);

const onResponseSuccess = (response) => {
  return response;
};
const onResponseFailure = (error) => {
  if (typeof window !== "undefined") {
  if (!navigator.onLine) {
    queueRequest(error.config);
    showOfflineMessage();
  } else if (error.response) {
    handleResponseError(error.response);
  } else {
    handleNetworkError();
  }
}
  return Promise.reject(error);
};

const offlineQueue = [];

const queueRequest = (requestConfig) => {
  offlineQueue.push(requestConfig);
};

const processOfflineQueue = () => {
  while (offlineQueue.length > 0) {
    const requestConfig = offlineQueue.shift();
    axios(requestConfig)
      .then((response) => {
        // Handle successful response
      })
      .catch((error) => {
        // Handle failed response
      });
  }
};

const showOfflineMessage = () => {
  toast.info(
    "You are currently offline. Requests will be sent when you are back online."
  );
};

const handleResponseError = (response) => {
  if (
    response.status === 401 &&
    response.data.message == "Token Signature could not be verified."
  ) {
    swal(response.data.message, {
      icon: "warning",
      timer: 5000,
    }).then(() => {
      clearCookiesAndReload();
    });
  } else if (
    response.status === 401 &&
    response.data.message == "Token has expired"
  ) {
    swal("Please login again", {
      icon: "warning",
      timer: 5000,
    }).then(() => {
      clearCookiesAndReload();
    });
  } else if (response.status === 401) {
    swal("Something went wrong. Please login again", {
      icon: "warning",
      timer: 5000,
    }).then(() => {
      clearCookiesAndReload();
    });
  } else if (response.status === 400 && response.data.token_exp_invalid) {
    swal(response.data.token_exp_invalid, {
      icon: "warning",
      timer: 5000,
    }).then(() => {
      clearCookiesAndReload();
    });
  }
};

const handleNetworkError = () => {
  const customMsg =
    "Server is taking longer time to respond, please try again later.";
  swal(customMsg, {
    icon: "warning",
    timer: 5000,
  }).then(() => {
    clearCookiesAndReload();
  });
};

const clearCookiesAndReload = () => {
  Cookies.remove("auth_token");
  Cookies.remove("user");
  if (typeof window !== "undefined") {
    window.location.reload(false);
  }
};

instance.interceptors.request.use(onRequestSuccess, onRequestFailure);
instance.interceptors.response.use(onResponseSuccess, onResponseFailure);
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    processOfflineQueue();
  });
}

export default instance;
