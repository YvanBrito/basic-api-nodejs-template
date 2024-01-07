import { Router } from 'express'
import { signUpController } from './controllers'

const signUpRoutes = Router()

signUpRoutes.post('/signup', async (req, res, next) => {
  try {
    const newUser = req.body
    const { statusCode, body } = await signUpController.signup(newUser)
    res.status(statusCode).json(body)
  } catch (err: unknown) {
    next(err)
  }
})

export default signUpRoutes
