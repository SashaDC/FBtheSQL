import type { User } from '../../models/users.ts'
import db from './connection.ts'

export async function getFriendsOfAUser(id: number): Promise<User[]> {
  //Get friend details from friendships db where user is user_1
  const friendsWhereUserIsUser1: User[] = await db('friendships')
    .join('users', 'friendships.user_2', 'users.id')
    .where('friendships.user_1', id)
    .select([
      'users.id',
      'users.full_name as fullName',
      'users.account_name as accountName',
      'users.email',
      'users.avatar_url as avatarUrl',
    ])
  //Get friend details from friendships db where user is user_2
  const friendsWhereUserIsUser2: User[] = await db('friendships')
    .join('users', 'friendships.user_1', 'users.id')
    .where('friendships.user_2', id)
    .select([
      'users.id',
      'users.full_name as fullName',
      'users.account_name as accountName',
      'users.email',
      'users.avatar_url as avatarUrl',
    ])
  return [...friendsWhereUserIsUser1, ...friendsWhereUserIsUser2] as User[]
}

export async function addNewFriendship(
  id: number,
  id2: number,
): Promise<number> {
  //Sort ids so that lower id is always added as user_1
  const smallerId: number = id < id2 ? id : id2
  const largerId: number = id > id2 ? id : id2
  const response = await db('friendships')
    .returning(['id', 'user_1 as user1', 'user_2 as user2'])
    .insert({ user_1: smallerId, user_2: largerId })
  console.log(response)
  return 1
}
