import { FC } from "react"

interface EmptyProps {
  body: string,
}
export const Empty: FC<EmptyProps> = ({ body }) => {

  return (
    <div className="empty">
      {body}
    </div>
  )
}