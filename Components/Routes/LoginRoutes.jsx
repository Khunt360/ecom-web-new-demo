import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Function to create a HOC to protect routes
const createRedirectIfAuthenticated = (redirectPath) => (Component) => {
  const RedirectIfAuthenticatedComponent = (props) => {
    const { auth_token } = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      // Check if user is authenticated
      if (auth_token) {
        // Redirect to specified path (e.g., '/') or any other page
        router.push(redirectPath);
      }
    }, [auth_token, router]);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }

    // Render the wrapped component if not authenticated
    return !auth_token ? <Component {...props} /> : null;
  };

  return RedirectIfAuthenticatedComponent;
};

// Create a HOC to redirect to home page if authenticated
const RedirectIfAuthenticated = createRedirectIfAuthenticated('/');

export default RedirectIfAuthenticated;
