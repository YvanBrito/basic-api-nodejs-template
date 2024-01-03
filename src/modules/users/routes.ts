import { Router } from 'express'
import { userController } from '@/modules/users/controllers'

const userRoutes = Router()

userRoutes.get('/users', async (req, res) => {
  const { statusCode, body } = await userController.getUsers()
  res.status(statusCode).json(body)
})

userRoutes.post('/users', async (req, res, next) => {
  try {
    const newUser = req.body
    const { statusCode, body } = await userController.create(newUser)
    res.status(statusCode).json(body)
  } catch (err: unknown) {
    next(err)
  }
})

userRoutes.get('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { statusCode, body } = await userController.getById(id)
    res.status(statusCode).json(body)
  } catch (err: unknown) {
    next(err)
  }
})

export default userRoutes
