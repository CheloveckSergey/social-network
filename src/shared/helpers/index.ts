import { Message } from "../../entities/message";
import { MyDate } from "../types";

const getImageSrc = (src: string | undefined) => {
  const backUrl = process.env.REACT_APP_BACK_URL;
  let imageSrc: string;
  if (src) {
    imageSrc = backUrl + src;
  } else {
    imageSrc = 'https://e7.pngegg.com/pngimages/855/884/png-clipart-peter-griffin-youtube-television-film-internet-meme-youtube-television-child.png';
  }
  return imageSrc;
}

const getMusicSrc = (src: string | undefined): string => {
  if (!src) {
    return ''
  }
  const backUrl = process.env.REACT_APP_BACK_URL;
  const musicSrc = backUrl + src;
  return musicSrc;
}

function getImageUrlFromFile(file: File | undefined) {
  if (file) {
    return URL.createObjectURL(file);
  } else {
    return process.env.REACT_APP_DEFAULT_IMAGE;
  }
}

function convertTime(time: number) {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return `${minute}:${(second < 10) ? ("0" + second) : second}`;
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

function createIdGenerator() {
  let id = 1;

  return function idGenerator() {
    return id++;
  }
}

export const Helpers = {
  getImageSrc,
  getMusicSrc,
  isTheFirstMessageToday,
  getImageUrlFromFile,
  createIdGenerator,
  convertTime,
}