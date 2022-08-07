import { Injectable, NestMiddleware } from '@nestjs/common';
import { CONSOLE_COLORS } from './../../../constants';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const code = `STATUS_CODE: ${res.statusCode}`;
    const url = `PATH: ${req.url}`;
    const query = JSON.stringify(req.query);
    const body = JSON.stringify(req.body);
    console.log(
      `${CONSOLE_COLORS.BGcyan}MIDDLE_WARE: ${CONSOLE_COLORS.reset}${CONSOLE_COLORS.cyan}`,
      url,
      code,
      'BODY: ',
      body,
      'QUERY: ',
      query,
    );

    next();
  }
}
