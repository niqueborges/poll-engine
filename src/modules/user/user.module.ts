import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { PrismaUserRepository } from '../../infrastructure/database/prisma/repositories/prisma-user.repository';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/user/get-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/user/list-users.use-case';
import { UserController } from '../../presentation/controllers/user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
