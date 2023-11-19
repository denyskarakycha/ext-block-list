import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async getSalt(): Promise<string> {
    return await bcrypt.genSalt(16);
  }
  async getHash(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
