export interface UserData {
  firstName: string
  lastName: string
  username: string
  email: string
  avatarUrl: string
}

export interface User extends UserData {
  id: number
}

export interface UserLogin extends User {
  username: string
  email: string
  message?: string
}

export interface UserAndFriends extends User {
  friends: User[]
}
