export interface  EnvironmentI {
  production: boolean;
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
}
