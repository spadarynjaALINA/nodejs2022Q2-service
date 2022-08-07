import { HttpException, HttpStatus } from '@nestjs/common';
import { CONSOLE_COLORS } from './../../constants';
import { MyLogger } from 'src/modules/logger/logger.service';

export class ErrorHandler {
  logger = new MyLogger();
  notFound(type: string, method?: string) {
    this.logger.error(
      `${CONSOLE_COLORS.BGmagenta} ERROR:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.magenta} METHOD:${method} STATUS_CODE:404 MSG:${type} not found`,
    );
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `${type} not exist`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
  //  UNPROCESSABLE_ENTITY = 422
  notExist(type: string) {
    throw new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: `${type} not exist`,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
  //  CREATED = 201
  alreadyExist(type: string) {
    throw new HttpException(
      {
        status: HttpStatus.CREATED,
        message: `${type}  already exist`,
      },
      HttpStatus.CREATED,
    );
  }
  // BAD_REQUEST = 400
  badRequest() {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `Bad request`,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // 204
  deleted(item) {
    throw new HttpException(
      {
        status: HttpStatus.NO_CONTENT,
        message: `${item} has been deleted`,
      },
      HttpStatus.NO_CONTENT,
    );
  }

  notMatch() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `Password id wrong`,
      },
      HttpStatus.FORBIDDEN,
    );
  }
  serverError() {
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Internal server error`,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  forbidden() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `Forbidden`,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
