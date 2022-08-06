import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    process.stdout.write(
      `${req.url}-${req.query}-${req.body}-${req.statusCode}`,
    );
    next();
  }
}
