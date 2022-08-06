import { LoggerService } from '@nestjs/common';
import { CONSOLE_COLORS } from './../../../constants';

import 'dotenv/config';

export class MyLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }
}
