import request, { post } from 'superagent'
import { posts } from '../../models/posts'
import { response } from 'express'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getPosts() {
  const response = await request.get(`${rootURL}/posts`)
  return response.body as posts[]
}

// Added

// Create a new post
// we can remove Omit if the database will
// have an auto numbering in our database

export async function addNewPost(data: Omit<posts, 'id'>): Promise<number> {
  const response = await request.post(`${rootURL}/posts/new`).send(data)
  return response.body
}

//Update an existing post
export async function updatePost(data: posts): Promise<posts> {
  const response = await request.patch(`${rootURL}/posts/edit`).send(data)
  return response.body
}

export async function deletePostById(postId: number): Promise<void> {
  await request.delete(`${rootURL}/posts/${postId}`)
}
