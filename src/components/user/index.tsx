import { User as NextUiUser } from "@nextui-org/react"

import type React from "react"
import { BASE_URL } from "../../constants"

type Porps = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

export const User: React.FC<Porps> = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}) => {
  return (
    <NextUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{ src: `${BASE_URL}${avatarUrl}` }}
    ></NextUiUser>
  )
}
