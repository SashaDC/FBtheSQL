import request from 'superagent'
import { posts } from '../../models/posts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getPosts() {
  const response = await request.get(`${rootURL}/posts`)
  return response.body as posts[]
}
