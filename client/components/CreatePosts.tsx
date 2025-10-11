import { useState, ChangeEvent } from 'react'
import { useAddNewPost } from '../hooks/usePosts'
import { posts } from '../../models/posts'

interface Props {
  userId: number
}

export default function CreatePosts({ userId }: Props) {
  // Form for post making
  const [formState, setFormState] = useState({
    title: '',
    content: '',
  })

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addNewPost = useAddNewPost()
  const date = new Date().toLocaleString()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const newPost = {
      title: formState.title,
      content: formState.content,
      date,
      user_id: userId,
    }
    addNewPost.mutate(newPost as posts)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleChange}
        />
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          name="content"
          placeholder="Content"
          value={formState.content}
          onChange={handleChange}
        />
        <div></div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </>
  )
}
