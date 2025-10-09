import { Router } from 'express'
import type { User } from '../../models/users.ts'

import * as db from '../db/users.ts'

const router = Router()

router.get('/all', async (req, res) => {
  try {
    const userList: User[] = await db.getAllUsers()
    res.json(userList)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user: User | null = await db.getUserById(Number.parseInt(id))
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
