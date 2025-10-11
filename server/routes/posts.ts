import db from '../db/connection.ts'
import { posts } from '../../models/posts'
import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const allPosts: posts[] = await db<posts>('posts').select('*')
    res.status(200).json(allPosts)
  } catch (error) {
    res.status(500).json({ message: 'Error grabbing the posts :(', error })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const post = await db<posts>('posts').where({ id }).first()
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'No post found :(' })
    }
  } catch (e) {
    res.status(500).json({ message: 'Error getting post :(', e })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const { name, content, date, user_id } = req.body
  try {
    const [newPost] = await db<posts>('posts')
      .insert({ name, content, date, user_id })
      .returning('*')
    res.status(201).json(newPost)
  } catch (e) {
    res.status(500).json({ message: 'Error creating post :(', e })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const removed = await db<posts>('posts').where({ id }).del()
    if (removed) {
      res.status(200).json({ message: 'Post was deleted' })
    } else {
      res.status(404).json({ message: 'No post found ' })
    }
  } catch (e) {
    res.status(500).json({ message: 'Error deleting post :(', e })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, content, date, user_id } = req.body
  try {
    const [updatedPost] = await db<posts>('posts')
      .where({ id })
      .update({ name, content, date, user_id })
      .returning('*')
    res.status(200).json(updatedPost)
  } catch (e) {
    res.status(500).json({ message: 'Error updating post :(' })
  }
})
export default router
