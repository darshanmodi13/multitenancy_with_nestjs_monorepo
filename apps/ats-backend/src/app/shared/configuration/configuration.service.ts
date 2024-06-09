import { Injectable } from '@nestjs/common';
import { IConfiguration } from './interface/configuration.interface';
import { cleanEnv, port, str } from 'envalid';
@Injectable()
export class ConfigurationService {
  private readonly environmentVars: IConfiguration;

  constructor() {
    this.environmentVars = cleanEnv(process.env, {
      API_PORT: port({ default: 6969 }),
      DB_URL: str(),
    });
  }

  public get<K extends keyof IConfiguration>(key: K): IConfiguration[K] {
    return this.environmentVars[key];
  }
}
