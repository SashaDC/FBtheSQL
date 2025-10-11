import { Router } from 'express'

import * as db from '../db/friendshipsDb.ts'

const router = Router()

router.post('/new', async (req, res) => {
  try {
    const { userId1, userId2 } = req.body
    const friendshipId: number = await db.addNewFriendship(
      Number.parseInt(userId1),
      Number.parseInt(userId2),
    )
    res.status(201).json(friendshipId)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
