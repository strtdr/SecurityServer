import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync('.env'));
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
}
