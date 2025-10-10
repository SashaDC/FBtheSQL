import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewFriendship } from '../apis/friendApi.ts'

export function useAddNewFriendship(userId1: number, userId2: number) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addNewFriendship,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`user${userId1}PlusFriends`],
      })
      queryClient.invalidateQueries({
        queryKey: [`user${userId2}PlusFriends`],
      })
    },
  })
  return mutation
}
