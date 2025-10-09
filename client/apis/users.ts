import request from 'superagent'
import { User } from '../../models/users'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllUsers(): Promise<User[]> {
  const response = await request.get(`${rootURL}/users/all`)
  return response.body
}

export async function getUserById(userId: number): Promise<User | null> {
  const response = await request.get(`${rootURL}/users/${userId}`)
  return response.body
}
