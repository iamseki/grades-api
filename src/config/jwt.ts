export const JwtConfig = {
  secret: process.env.JWT_SECRET || 'dev',
  expiresIn: process.env.JWT_EXPIRES || '86400s',
};
