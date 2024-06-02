import { UserAttributes } from 'database/models/MtUser';
import { Request } from 'express';

export interface AuthReq extends Request{
  user?: UserAttributes
}