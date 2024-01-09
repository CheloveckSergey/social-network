import { Message } from "../../entities/message";
import { MyDate } from "../types";

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

function getImageUrlFromFile(file: File | undefined) {
  if (file) {
    return URL.createObjectURL(file);
  } else {
    return process.env.REACT_APP_DEFAULT_IMAGE;
  }
}

// const getTodayDate: (date: string) => string = (date: string) => {
//   const regExp = /\d{4}-\d{2}-\d{2}/;
//   const concidences = date.match(regExp);
//   if (concidences) {
//     return concidences[0];
//   } else {
//     return 'Unknown date';
//   }
// }

// const getDateObject: (date: string) =>

export function isTheFirstMessageToday(message: Message, messages: Message[]): boolean {
  const curMessageIndex = messages.findIndex(_message => _message.id === message.id);
  if (curMessageIndex === 0) {
    return true;
  }
  const previousMessageIndex = curMessageIndex - 1;
  const prMesDate = new MyDate(messages[previousMessageIndex].createdAt);
  const date = new MyDate(message.createdAt);
  if (date.isMoreThen(prMesDate)) {
    return true;
  } else {
    return false;
  }
}

export const Helpers = {
  getImageSrc,
  isTheFirstMessageToday,
  getImageUrlFromFile
}