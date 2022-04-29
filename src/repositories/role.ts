import { TblRole } from '../db/tables';
import BaseRepository from './base';

export default class RoelRepository extends BaseRepository {
  constructor() {
    super(new TblRole());
  }
}
