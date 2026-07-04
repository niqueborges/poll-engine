import { User } from '../../../domain/entities/user.entity';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { CreateUserCommand } from '../../commands/user/create-user.command';
import { ConflictError } from '../../../domain/exceptions/conflict.error';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new ConflictError('A user with this email already exists.');
    }

    const user = User.create({
      name: command.name,
      email: command.email,
    });

    return this.userRepository.create(user);
  }
}
