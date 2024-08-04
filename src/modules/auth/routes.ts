import { Router } from 'express';
import passport from 'passport';
import { signUpController } from './controllers/signup.controller';
import { HttpErrorResponse } from '@/utils/errors';
import { loginController } from './controllers/login.controller';
import { LoginUserRequest } from './types';

const authRoutes = Router();

authRoutes.post('/signup', async (req, res, next) => {
  try {
    const newUser = req.body;
    const { statusCode, body } = await signUpController.signup(newUser);
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

        try {
          const { statusCode, body } = await loginController.execute(
            user as unknown as LoginUserRequest,
          );
          res.status(statusCode).json(body);
        } catch (err: unknown) {
          next(err);
        }
      });
    },
  )(req, res, next);
});

export default authRoutes;
