import { useDeletePostByUserId } from '../hooks/usePosts'
import { useNavigate } from 'react-router'

interface Props {
  userId: number
}

export default function DeletePost({ userId }: Props) {
  const deletePost = useDeletePostByUserId()
  const navigate = useNavigate()
  const handleClick = () => {
    deletePost.mutate(userId)
    navigate('/posts')
  }
  return (
    <>
      <button onClick={handleClick}>Delete post</button>
    </>
  )
}
