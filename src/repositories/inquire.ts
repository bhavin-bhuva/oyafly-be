import { TblInquire } from '../db/tables';
import BaseRepository from './base';

export default class InquireRepository extends BaseRepository {
  constructor() {
    super(new TblInquire());
  }
}
