import type { User as PrismaUser } from '../client/client';
import { User } from '../../../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return User.create({
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      createdAt: prismaUser.createdAt,
    });
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
