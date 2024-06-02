import jwt, {JwtPayload  } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
dotenv.config();

const secretKey = process.env.JWT_ENCODE || 'adudu123';

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
  }
  
const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        req.user = decoded;
        return next();
      } catch (err: any) {
        return res.status(403).json({ message: err.message });
      }
    } else {
      return res.status(401).json({ message: 'No token provided.' });
    }
  };

  export default authenticateJWT;