import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler {
  notFound(type: string) {
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
}
