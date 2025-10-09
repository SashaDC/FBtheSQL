import db from './connection.ts'
import type { User, UserData } from '../../models/users.ts'

export async function getAllUsers(): Promise<User[]> {
  const response = await db('users').select([
    'id',
    'full_name as fullName',
    'account_name as accountName',
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
      'full_name as fullName',
      'account_name as accountName',
      'email',
      'avatar_url as avatarUrl',
    ])
    .first()
  return response as User | null
}

export async function addNewUser({
  fullName,
  email,
  accountName,
  avatarUrl,
}: UserData): Promise<number> {
  const [{ id }] = await db('users')
    .insert({
      full_name: fullName,
      email,
      account_name: accountName,
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
  fullName,
  email,
  accountName,
  avatarUrl,
}: User): Promise<null | User> {
  const updatedUser = await db('users').where({ id }).update(
    {
      full_name: fullName,
      email: email,
      account_name: accountName,
      avatar_url: avatarUrl,
    },
    [
      'id',
      'full_name as fullName',
      'email',
      'account_name as accountName',
      'avatar_url as avatarUrl',
    ],
  )
  return updatedUser[0] ? (updatedUser[0] as User) : null
}
