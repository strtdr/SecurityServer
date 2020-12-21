import { ValueTransformer } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class PasswordTransformer implements ValueTransformer {
  public to(value: string): string {
    if (value) {
      return bcrypt.hashSync(value, 10);
    }
    return value;
  }

  public from(value: string): string {
    return value;
  }
}
