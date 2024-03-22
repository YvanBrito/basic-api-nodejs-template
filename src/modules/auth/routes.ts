import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authController } from './controllers/auth.controller';
import { HttpErrorResponse } from '@/utils/errors';

const authRoutes = Router();

authRoutes.post('/signup', async (req, res, next) => {
  try {
    const newUser = req.body;
    const { statusCode, body } = await authController.signup(newUser);
    res.status(statusCode).json(body);
  } catch (err: unknown) {
    next(err);
  }
});

authRoutes.post('/login', async (req, res, next) => {
  passport.authenticate(
    'local',
    async (err: unknown, user: { id: string; email: string }) => {
      if (err || !user) {
        const { statusCode, message } = err as HttpErrorResponse;
        res.status(statusCode).json({
          statusCode,
          message,
        });
        return;
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');

        return res.json({ token });
      });
    },
  )(req, res, next);
});

export default authRoutes;
