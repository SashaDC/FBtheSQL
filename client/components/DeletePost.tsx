import { useDeletePostById } from '../hooks/usePosts'
import { useNavigate } from 'react-router'

interface Props {
  postId: number
}

export default function DeletePost({ postId }: Props) {
  const deletePost = useDeletePostById()
  const navigate = useNavigate()
  const handleClick = () => {
    deletePost.mutate(postId)
    navigate('/')
  }
  return (
    <>
      <button onClick={handleClick}>Delete post</button>
    </>
  )
}
