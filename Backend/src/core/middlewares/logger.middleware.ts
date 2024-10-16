import { Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.printf(({ level, message, timestamp }) => {
              return `${timestamp} [${level}]: ${message}`;
            }),
          ),
        }),
      ],
    });
  }

  info(message: string) {
    this.logger.info(message);
  }

  // error(message: string) {
  //   this.logger.error(message);
  // }

  error(message: string, stack?: string) {
    this.logger.error(`${message} - ${stack}`);
  }
}
