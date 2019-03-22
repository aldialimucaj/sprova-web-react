import { ObjectId } from 'bson';

export interface Project {
  _id: ObjectId;
  description: any;
  title: string;
  userId: ObjectId;
}
