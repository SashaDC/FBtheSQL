import { useGetPosts } from '../hooks/usePosts'

export default function Posts() {
  const { isPending, isError, data } = useGetPosts()

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
        {data?.map((data) => (
          <li key={data.id} className="post">
            <div className="name">
              <span className="title">{data.title}</span>
              <p className="content">{data.content}</p>
              <p className="date">{data.date}</p>
              {/* Make the data.user_id match the users id. Possibly a database.join hook/query maybe?*/}
              <p className="user">{data.user_id}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
