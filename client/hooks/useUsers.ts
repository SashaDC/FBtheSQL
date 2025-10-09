import { useQuery } from '@tanstack/react-query'
import { getAllUsers, getUserById } from '../apis/users.ts'

export function useGetAllUsers() {
  const query = useQuery({ queryKey: ['user-list'], queryFn: getAllUsers })
  return {
    ...query,
  }
}

export function useGetUserById(id: number) {
  const query = useQuery({
    queryKey: [`user${id}`],
    queryFn: () => getUserById(id),
  })
  return {
    ...query,
  }
}
