import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '../middlewares/logger.middleware';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    applicationRef: HttpAdapterHost,
    private readonly loggerService?: LoggerService,
  ) {
    super(applicationRef.httpAdapter);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof Prisma.PrismaClientValidationError
    ) {
      const status = HttpStatus.BAD_REQUEST;
      this.logError(exception, status);
      response.status(status).json({
        statusCode: status,
        message: exception.message
          .replace(/\\/g, '')
          .replace(/\n/g, '')
          .replace(/"/g, "'"),
        error: 'Database Error',
      });
    } else {
      super.catch(exception, host);
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      this.logError(exception, status);
    }
  }

  private logError(exception: unknown, status: number) {
    const errorMessage =
      exception instanceof Error
        ? exception.message
        : 'An unexpected error occurred';
    const errorStack = exception instanceof Error ? exception.stack : '';

    if (status >= 400) {
      this.loggerService?.error(errorMessage, errorStack);
    }
  }
}
