import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public',
        },
      },
    });
  }

  // cleanDb() {
  //   return this.$transaction([
  //     this.bookmark.deleteMany(),
  //     this.user.deleteMany(),
  //   ]);
  // }
}
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => {
//       await app.close();
//     });
//   }
// }
