import { EnvironmentI } from "../app/core/utils/enviromentsI";


export const environment : EnvironmentI = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3000/api/',
    timeout: 10000,
    retryAttempts: 3
  }
} ;
