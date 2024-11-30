import { Card, CardBody } from "@nextui-org/react"

import { Link } from "react-router-dom"
import { User } from "../../components/user"
import { selectCurrent } from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"

export const Following = () => {
  const currentUser = useAppSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map(user => (
        <Link to={`/users/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>You have no users.</h1>
  )
}