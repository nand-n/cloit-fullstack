import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger.middleware';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {
    morgan.token(
      'message',
      (req: Request, res: Response) => res.locals.errorMessage || '',
    );
  }

  getIpFormat() {
    return this.configService.get<string>('NODE_ENV') === 'production'
      ? ':remote-addr - '
      : '';
  }

  successResponseFormat() {
    return `${this.getIpFormat()}:method :url :status - :response-time ms`;
  }

  errorResponseFormat() {
    return `${this.getIpFormat()}:method :url :status - :response-time ms - message: :message`;
  }

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        res.locals.errorMessage = 'An error occurred';
      }
    });

    morgan(
      (tokens, req, res) => {
        const format =
          res.statusCode >= 400
            ? this.errorResponseFormat()
            : this.successResponseFormat();
        return morgan.compile(format)(tokens, req, res);
      },
      {
        stream: {
          write: (message: string) => {
            if (res.statusCode >= 400) {
              this.loggerService.error(message.trim());
            } else {
              this.loggerService.info(message.trim());
            }
          },
        },
      },
    )(req, res, next);
  }
}
