import request from 'superagent'
import type { FriendshipData } from '../../models/friends'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function addNewFriendship(data: FriendshipData): Promise<number> {
  const response = await request.post(`${rootURL}/friends/new`).send(data)
  return response.body
}
