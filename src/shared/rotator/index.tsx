import { FC } from "react"
import { AiOutlineLoading } from "react-icons/ai"
import './styles.scss';

interface RotatorProps {
  size?: number,
}

const Rotator: FC<RotatorProps> = ({ size }) => {
  if (!size) {
    size = 35;
  }

  return (
    <AiOutlineLoading size={size} className="rotator" />
  )
}

export default Rotator;