import { DomainError } from './domain.error';

export class NotFoundError extends DomainError {
  constructor(message: string = 'Resource not found') {
    super(message);
  }
}
