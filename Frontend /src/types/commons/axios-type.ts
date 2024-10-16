export interface AxiosErrorResponse {
  response: {
    data: {
      message: string;
    };
    statusText: string;
  };
}
