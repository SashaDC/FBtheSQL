import { useOutletContext } from 'react-router'
import { useGetPosts } from '../hooks/usePosts'
import DeletePost from './DeletePost'
import { Credentials } from '../../models/outletContext'

export default function Posts() {
  const { isPending, isError, data } = useGetPosts()
  const { credentials } = useOutletContext<Credentials>()

  if (isPending) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error?</h2>
  }

  return (
    <>
      <h2>Posts:</h2>
      <ul className="posts">
        {data?.map((post) => {
          const postUserId = String(post.user_id)
          const currentUserId = String(credentials?.userId)
          const isOwnPost = postUserId === currentUserId

          console.log('Post:', post.id)
          console.log(
            '  post.user_id:',
            post.user_id,
            'type:',
            typeof post.user_id,
          )
          console.log(
            '  credentials.userId:',
            credentials?.userId,
            'type:',
            typeof credentials?.userId,
          )
          console.log('  postUserId (string):', postUserId)
          console.log('  currentUserId (string):', currentUserId)
          console.log('  isOwnPost:', isOwnPost)
          console.log('---')

          return (
            <li key={post.id} className="post">
              <div className="name">
                <span className="title">{post.title}</span>
                <p className="content">{post.content}</p>
                <p className="date">{post.date}</p>
                <p className="user">{post.username}</p>
                {isOwnPost && <DeletePost postId={post.id} />}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
