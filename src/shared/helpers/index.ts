const getImageSrc = (src: string | undefined) => {
  const backUrl = process.env.REACT_APP_BACK_URL;
  let imageSrc: string;
  if (src) {
    imageSrc = backUrl + src;
  } else {
    imageSrc = 'https://i.pinimg.com/736x/b8/64/a5/b864a5224eccc107594cf2f5a84b6af8--peter-griffin-family-guy.jpg';
  }
  return imageSrc;
}

export const Helpers = {
  getImageSrc,
}