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
}
