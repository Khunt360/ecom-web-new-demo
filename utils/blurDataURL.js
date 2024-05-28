// utils/blurDataURL.js

const getBlurDataURL = (imageName) => {
    // Adjust the path according to your image in the public folder
    const imagePath = `/images/${imageName}`;
    // Example of generating a blur data URL manually
    const base64 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mP8/w8AAwAB/7+fHgAAAABJRU5ErkJggg==';
    return base64;
  };
  
  export default getBlurDataURL;
  