import { UserRepository } from '@/modules/users/repositories';
import { createHash } from 'node:crypto';
import { Strategy as LocalStrategy } from 'passport-local';
import { NotFoundError, UnauthorizedError } from './errors';

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    const userRepository = new UserRepository();
    const foundUser = await userRepository.getByEmail(email);
    if (!foundUser)
      return done(new NotFoundError('Email não encontrado'), false);

    const hashed_password = createHash('sha256')
      .update(password)
      .update(createHash('sha256').update(foundUser.salt, 'utf8').digest('hex'))
      .digest('hex');

    if (hashed_password !== foundUser.hashed_password)
      return done(new UnauthorizedError('Senha incorreta'), false);

    done(null, foundUser);
  },
);
