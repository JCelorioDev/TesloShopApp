export interface  EnvironmentI {
  production: boolean;
  api: {
    baseUrl: string;
    photoUrl : string;
    timeout: number;
    retryAttempts: number;
  };
}
