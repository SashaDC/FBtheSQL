import { Router } from 'express'
import type { User, UserData } from '../../models/users.ts'

import * as db from '../db/usersDb.ts'

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
  try {
    const { id } = req.params
    const user: User | null = await db.getUserById(Number.parseInt(id))
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/new', async (req, res) => {
  try {
    const { firstName, lastName, email, username, avatarUrl } = req.body
    console.log('post ran')
    const id = await db.addNewUser({
      firstName,
      lastName,
      email,
      username,
      avatarUrl,
    } as UserData)
    res.status(201).json(id)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/edit', async (req, res) => {
  try {
    const id = Number.parseInt(req.body.id)
    const { firstName, lastName, email, username, avatarUrl } = req.body
    const editedUser: null | User = await db.editUser({
      id,
      firstName,
      lastName,
      email,
      username,
      avatarUrl,
    } as User)
    editedUser ? res.status(201).json(editedUser) : res.sendStatus(500)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
