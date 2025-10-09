export interface UserData {
  accountName: string
  fullName: string
  email: string
  avatarUrl: string
}

export interface User extends UserData {
  id: number
}

export interface UserAndFriends extends User {
  friends: User[]
}
