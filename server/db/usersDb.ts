import db from './connection.ts'
import type { User, UserData } from '../../models/users.ts'

export async function getAllUsers(): Promise<User[]> {
  const response = await db('users').select([
    'id',
    'first_name as firstName',
    'last_name as lastName',
    'username',
    'email',
    'avatar_url as avatarUrl',
  ])
  return response as User[]
}

export async function getUserById(id: number): Promise<User | null> {
  const response = await db('users')
    .where('users.id', id)
    .select([
      'id',
      'first_name as firstName',
      'last_name as lastName',
      'username',
      'email',
      'avatar_url as avatarUrl',
    ])
    .first()
  return response as User | null
}

export async function addNewUser({
  firstName,
  lastName,
  email,
  username,
  avatarUrl,
}: UserData): Promise<number> {
  const [{ id }] = await db('users')
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      avatar_url: avatarUrl,
    })
    .returning('users.id')
  if (id) {
    return id as number
  } else {
    throw new Error('Error adding new user to database')
  }
}

export async function editUser({
  id,
  firstName,
  lastName,
  email,
  username,
  avatarUrl,
}: User): Promise<null | User> {
  const updatedUser = await db('users').where({ id }).update(
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      avatar_url: avatarUrl,
    },
    [
      'id',
      'first_name as firstName',
      'last_name as lastName',
      'username',
      'email',
      'avatar_url as avatarUrl',
    ],
  )
  return updatedUser[0] ? (updatedUser[0] as User) : null
}
