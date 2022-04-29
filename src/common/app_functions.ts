const isvalid = require('isvalid');
import fs from 'fs';
import { RequestParams } from '../common/custom_types';
import utility from './utility';

class AppFunctions {
  public async validateSchema(schema: object, data: object): Promise<{ status: boolean; error?: string }> {
    try {
      await isvalid(data, schema);
      return { status: true };
    } catch (err) {
      return { status: false, error: err.message };
    }
  }

  public renderEmailTemplate(name: string, vars: RequestParams, from = 'email_templates'): string {
    let html = fs.readFileSync(`${__dirname}/../public/${from}/${name}.html`, 'utf8');
    const keys = Object.keys(vars);
    keys.forEach((key) => {
      const reg = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(reg, vars[key]);
    });
    return html;
  }

  public generateResetCode(userId: string) {
    const now = new Date();
    const timeHash = Buffer.from(now.toISOString()).toString('base64');
    const userHash = utility.createMD5Hash(userId);
    const rawHash = `${timeHash}-${userHash}`;
    return Buffer.from(rawHash, 'utf-8').toString('base64');
  }

  public decryptResetCode(resetHash: string): Date {
    const rawHash = Buffer.from(resetHash, 'base64').toString('utf-8');
    const arrHash = rawHash.split('-');
    const timeHash = Buffer.from(arrHash[0], 'base64').toString();
    return new Date(timeHash);
  }
}

export default new AppFunctions();
