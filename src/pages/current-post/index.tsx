import { useParams } from "react-router-dom"

import { useGetPostByIdQuery } from "../../app/services/postApi"
import { Card } from "../../components/card"
import { GoBack } from "../../components/go-back"
import { CreateComment } from "../../components/create-comment"
export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params.id ?? "")

  if (!data) {
    return <h2>Post does not exist </h2>
  }

  const {
    content,
    id,
    author,
    comments,
    authorId,
    likes,
    likedByUser,
    createdAt,
  } = data

  return (
    <>
      <GoBack />

      <Card
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        likedByUser={likedByUser}
        createdAt={createdAt}
        key={id}
        id={id}
      />

      <div className="mt-10">
        <CreateComment />
      </div>

      <div className="mt-10">
        {data.comments
          ? data.comments.map(comment => (
              <Card
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                commentId={comment.id}
                authorId={comment.userId}
                id={id}
              />
            ))
          : null}
      </div>
    </>
  )
}
