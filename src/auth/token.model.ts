export interface TokenClaims {
  accountId: string;
  /** The UNIX expiry timestamp. */
  exp: number;
  tokenId: string;
}

export interface TokenVerificationResult {
  success: boolean;
  claims?: TokenClaims;
  error?: {
    type: string;
    message: string;
  };
}

// export interface AuthToken {
//   token: string;
//   metadata: {
//     expiry: Date;
//   };
// }

export interface TokenHandler {
  generateToken(userId: string, expiry: Date, tokenId: string): string;
  verifyToken(token: string): TokenVerificationResult;
}
