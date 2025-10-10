import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAllUsers,
  getUserById,
  addNewUser,
  editUser,
  getUserPlusFriends,
} from '../apis/users.ts'

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

export function useGetUserPlusFriends(id: number) {
  const query = useQuery({
    queryKey: [`user${id}PlusFriends`],
    queryFn: () => getUserPlusFriends(id),
  })
  return {
    ...query,
  }
}

export function useAddNewUser() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
    },
  })
  return mutation
}

export function useEditUser(id: number) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
      queryClient.invalidateQueries({ queryKey: [`user${id}`] })
      queryClient.invalidateQueries({ queryKey: [`user${id}PlusFriends`] })
    },
  })
  return mutation
}
