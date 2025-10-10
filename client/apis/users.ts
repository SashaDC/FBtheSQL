import request from 'superagent'
import { User, UserAndFriends, UserData } from '../../models/users'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllUsers(): Promise<User[]> {
  const response = await request.get(`${rootURL}/users/all`)
  return response.body
}

export async function addNewUser(data: UserData): Promise<number | void> {
  const response = await request.post(`${rootURL}/users/new`).send(data)
  return response.body
}

export async function editUser(data: User): Promise<User | void> {
  const response = await request.patch(`${rootURL}/users/edit`).send(data)
  return response.body
}

export async function getUserById(userId: number): Promise<User> {
  const response = await request.get(`${rootURL}/users/${userId}`)
  return response.body
}

export async function getUserPlusFriends(
  userId: number,
): Promise<UserAndFriends> {
  const response = await request.get(`${rootURL}/users/${userId}/plus-friends`)
  return response.body
}
