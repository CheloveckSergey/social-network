import { useEffect, useRef } from "react"

const useClickOutside = (ref: React.MutableRefObject<any>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    // console.log(ref?.current);
    // console.log(e.target);
    if (ref?.current && !ref.current.contains(e.target)) {
      callback();
    }
  }
  useEffect(() => {
    // console.log('useEffect');
    document.addEventListener('click', handleClick);
    return () => { document.removeEventListener('click', handleClick); }
  }, []);
}

export const SharedHooks = {
  useClickOutside,
}