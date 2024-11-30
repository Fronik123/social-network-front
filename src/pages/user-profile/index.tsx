import { Card, useDisclosure, Image, Button } from "@nextui-org/react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../constants"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { CountInfo } from "../../components/count-info"
import { EditProfile } from "../../components/edit-profile"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useAppDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
      }

      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) {
    return null
  }

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()

        await triggerGetUserByIdQuery(id)

        await triggerCurrentQuery()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <GoBack />

      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data?.avatarUrl}`}
            alt={data?.name}
            width={200}
            height={200}
            className="border-4 border-2h"
          />

          <div className="flex flex-col text-2xl font-bold gap-4  item-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                className="gap-2"
                variant="flat"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Unsubscribe" : "Subscribe"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                Edit
              </Button>
            )}
          </div>
        </Card>

        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Email" info={data.email} />

          <ProfileInfo title="Location" info={data.location} />

          <ProfileInfo
            title="Date of birth"
            info={formatToClientDate(data.dateOfBirth)}
          />

          <ProfileInfo title="About me" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="подписчика" />
            <CountInfo count={data.following.length} title="подписки" />
          </div>
        </Card>
      </div>

      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}
