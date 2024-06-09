import { CleanedEnvAccessors } from 'envalid';

export interface IConfiguration extends CleanedEnvAccessors {
  API_PORT: number;
  DB_URL: string;
}
