import db from './connection.ts'
import { User } from '../../models/users.ts'

export async function getAllUsers() {
  const response = await db('users').select([
    'id',
    'full_name as fullName',
    'account_name as accountName',
    'email',
    'avatar_url as avatarUrl',
  ])
  return response as User[]
}

export async function getUserById(id: number) {
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
