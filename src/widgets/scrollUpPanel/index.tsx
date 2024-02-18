import { FC, useRef } from "react";
import './styles.scss';

interface SUPProps {
  scrollUp: () => void,
}
export const ScrollUpPanel: FC<SUPProps> = ({ scrollUp }) => {


  return (
    <div
      className="scroll-up-panel"
      onClick={() => {
        scrollUp();
      }}
    >
      Up
    </div>
  )
}