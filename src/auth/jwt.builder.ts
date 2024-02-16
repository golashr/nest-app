import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';
import {
  TokenClaims,
  TokenHandler,
  TokenVerificationResult,
} from './token.model';
export const defaultJwtSecret = jwtConstants.secret;

export const JWT_GENERATION_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
};

export class AuthJwtTokenBuilder implements TokenHandler {
  public generateToken(userName: string): string {
    try {
      const token = jwt.sign(
        {
          userName,
          exp: Date.now() + 3600,
        },
        defaultJwtSecret,
        JWT_GENERATION_CONFIG,
      );

      return token;
    } catch (error) {
      console.error(error);
    }
  }

  public verifyToken(
    token: string,
    secret = defaultJwtSecret,
  ): TokenVerificationResult {
    try {
      const tokenClaims = jwt.verify(token, secret) as TokenClaims;

      return { success: true, claims: tokenClaims };
    } catch ({ name, message }) {
      if (secret !== defaultJwtSecret) {
        return this.verifyToken(token, defaultJwtSecret);
      }
      return {
        success: false,
        error: {
          type: name,
          message,
        },
      };
    }
  }
}
