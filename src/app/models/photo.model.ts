import { TagModel } from './tag.model';

export interface PhotoModel {
  link: string;
  tags: TagModel[];
  dateCreated: any;
}
