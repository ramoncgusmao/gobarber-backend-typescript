import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export default BCryptHashProvider;
