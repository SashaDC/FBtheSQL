export interface User {
  id: number
  accountName: string
  fullName: string
  email: string
  avatarUrl: string
}

export interface UserAndFriends extends User {
  friends: User[]
}
