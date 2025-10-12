import { useDeletePostById } from '../hooks/usePosts'
import { useNavigate } from 'react-router'

interface Props {
  postId: number
}

export default function DeletePost({ postId }: Props) {
  const deletePost = useDeletePostById()
  const navigate = useNavigate()
  const handleClick = () => {
    deletePost.mutate(postId, {
      onSuccess: () => {
        alert('Post was erased from history.')
        console.log('Post deleted successfully')
      },
      onError: (error) => {
        alert('Failed to delete the post. Please try again.')
        console.error('Error deleting post:', error)
      },
    })
    navigate('/')
  }
  return (
    <>
      <button onClick={handleClick}>Delete post</button>
    </>
  )
}
