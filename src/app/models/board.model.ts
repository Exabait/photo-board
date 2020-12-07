import { PhotoModel } from './photo.model';

export interface BoardModel {
  _id?: string;
  title: string;
  photos?: PhotoModel[];
  dateCreated?: number;
  dateUpdated?: number;
}
