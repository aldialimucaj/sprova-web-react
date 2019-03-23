import { ObjectId } from 'bson';

export interface User {
  _id: ObjectId;
  exp: number;
  iat: number;
  username: string;
}
