import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class GenericErrorHandler {
  private readonly logger = new Logger(GenericErrorHandler.name);

  getHttpMessageforStatusCode(httpStatusCode: number): string {
    let httpErrorMessage: string;
    switch (httpStatusCode) {
      case 400: {
        httpErrorMessage = 'Bad Request ';
        break;
      }
      case 401: {
        httpErrorMessage = 'Unauthorized ';
        break;
      }
      case 403: {
        httpErrorMessage = 'Forbidden Resources ';
        break;
      }
      case 404: {
        httpErrorMessage = 'Not Found ';
        break;
      }
      case 406: {
        httpErrorMessage = 'Not Acceptable Exception';
        break;
      }
      default: {
        httpErrorMessage = 'Internal Server Error ';
        break;
      }
    }
    return httpErrorMessage;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleException(exception: any) {
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errMessage: string = exception.message;

    return { httpStatus, errMessage };
  }
}
