import fs from 'fs';
import crypto from 'crypto';
import axios from 'axios';
import os from 'os';
import path from 'path';
import { Request } from 'express';

import knex from './knex';
import { Pagination } from './custom_types';
import { promisify } from 'util';
import http from 'http';
const tmpdir = os.tmpdir();

class Utility {
  unlink = promisify(fs.unlink);

  get tmpDirPath() {
    const tmpDirPath = '/tmp';
    if (!fs.existsSync(tmpDirPath)) {
      fs.mkdirSync(tmpDirPath);
    }
    return tmpDirPath;
  }

  get randomHash() {
    const current_date = new Date().valueOf().toString();
    const random = Math.random().toString();
    return crypto
      .createHash('sha1')
      .update(current_date + random)
      .digest('hex');
  }

  public isEmpty(val: string | any): boolean {
    return val == null || val === null || val.length === 0;
  }

  public checkForNull(data: any, keys: Array<string>) {
    keys.forEach((key) => {
      if (!this.isEmpty(data[key]) && data[key] == 'null') {
        data[key] = null;
      }
    });
  }

  public getKnexDate() {
    return knex.fn.now();
  }

  public IsJsonString(str: string) {
    try {
      const data = JSON.parse(str);
      return data;
    } catch (e) {
      return false;
    }
  }

  public batchArray(array: Array<any>, size: number) {
    const batches = [];
    for (let i = 0; i < array.length; i += size) {
      batches.push(array.slice(i, i + size));
    }
    return batches;
  }

  public pagination(page: number, limit: number): Pagination {
    return { offset: (page - 1) * limit, limit: limit };
  }

  public createMD5Hash(str: string) {
    return crypto.createHash('md5').update(str).digest('hex');
  }

  public hash(noOfBytes: number) {
    return crypto.randomBytes(noOfBytes / 2).toString('hex');
  }

  public convertPrice(
    price: number,
    options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ): string {
    if (!price) {
      return '0';
    }
    const formatter = Intl.NumberFormat('en-US', options);

    return formatter.format(price).replace('$', '');
  }

  public seprateDecimal(num: string) {
    return (num + '').split('.');
  }

  public async mediaDownload(url: string, path: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      http.get(url.replace('https', 'http'), (response) => {
        const statusCode = response.statusCode;

        if (statusCode !== 200) {
          return reject('Download error!');
        }

        const writeStream = fs.createWriteStream(path);
        response.pipe(writeStream);

        writeStream.on('error', (error) => reject('Error writing to file!' + error));
        writeStream.on('finish', () => {
          writeStream.close();
          resolve(true);
        });
      });
      // eslint-disable-next-line no-console
    }).catch((err) => console.error(err));
  }

  public encodeBase64(data: string): string {
    let bufferObj = Buffer.from(data, 'utf8');
    return bufferObj.toString('base64');
  }

  public decodeBase64(strBase64: string) {
    let bufferObj = Buffer.from(strBase64, 'base64');
    return bufferObj.toString('utf8');
  }

  public async isAuthorized(tableName: string, id: string, clientId: string): Promise<boolean> {
    const query = await knex(tableName)
      .where({ [`${tableName}.id`]: id, [`${tableName}.client_id`]: clientId })
      .select();
    return query.length > 0 ? true : false;
  }

  public async downloadMedia(url: string): Promise<any> {
    try {
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      const filename = path.basename(url);
      const localPath = path.join(tmpdir, filename);
      await fs.promises.writeFile(localPath, res.data);
      return localPath;
    } catch (err) {
      return err;
    }
  }

  public async paginateArr(array, index, size) {
    // transform values
    index = Math.abs(parseInt(index));
    index = index > 0 ? index - 1 : index;
    size = parseInt(size);
    size = size < 1 ? 1 : size;

    // filter
    return [
      ...array.filter((_value, n) => {
        return n >= index * size && n < (index + 1) * size;
      }),
    ];
  }

  public fileNameFromUrl(url: string) {
    return path.basename(url);
  }

  public mbToBytes(mb: number): number {
    return mb * 1024 * 1024;
  }

  public writeFileLocally(filename: string, content: any): Promise<string> {
    const localPath = path.join(tmpdir, filename);
    return new Promise((res, rej) => {
      fs.writeFile(localPath, content, function (err) {
        if (err) {
          rej(err);
        }
        res(localPath);
      });
    });
  }

  public deleteLocalFile(filename: string) {
    try {
      fs.unlinkSync(filename);
    } catch (_err) {}
  }

  public fileMetaDataFromUrl(url: string) {
    const filename = path.basename(url);
    const ext = path.extname(filename) == '.jpg' ? '.jpeg' : path.extname(filename);
    const mime = `image/${ext.replace('.', '')}`;
    return { filename, ext, mime };
  }

  public removeEmptyOrNull(obj: any): any {
    Object.keys(obj).forEach(
      (k) =>
        (obj[k] && typeof obj[k] === 'object' && this.removeEmptyOrNull(obj[k])) ||
        (!obj[k] && obj[k] !== undefined && delete obj[k])
    );
    return obj;
  }

  public twillioUsers(client: any | null) {
    try {
      const rawdata = fs.readFileSync(__dirname + '/../public/twillio/sales_rep_creds.json');
      const domains: any = JSON.parse(rawdata.toString());
      return client ? domains[client] : domains;
    } catch (error) {
      return null;
    }
  }

  public extractToken(request: Request): string {
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
      return request.headers.authorization.split(' ')[1];
    }
    throw new Error('No token found');
  }
}

export default new Utility();
