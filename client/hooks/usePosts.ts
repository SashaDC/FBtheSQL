import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getPosts,
  addNewPost,
  updatePost,
  deletePostById,
} from '../apis/posts.ts'

//Get all posts
export function useGetPosts() {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
  return query
}

//  Add a new post
export function useAddNewPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

// Update a post
export function useUpdatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

// Delete a post
export function useDeletePostByUserId() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePostById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
