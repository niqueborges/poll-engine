import { BusinessRuleError } from '../exceptions/business-rule.error';
import { randomUUID } from 'crypto';

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export class User {
  private readonly _id: string;
  private _name: string;
  private readonly _email: string;
  private readonly _createdAt: Date;

  private constructor(props: UserProps) {
    this._id = props.id || randomUUID();
    
    if (!props.name || props.name.trim().length === 0) {
      throw new BusinessRuleError('User name cannot be empty.');
    }
    this._name = props.name.trim();

    if (!props.email || props.email.trim().length === 0) {
      throw new BusinessRuleError('User email cannot be empty.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(props.email)) {
      throw new BusinessRuleError('Invalid email format.');
    }
    this._email = props.email.trim().toLowerCase();
    
    this._createdAt = props.createdAt || new Date();
  }

  public static create(props: UserProps): User {
    return new User(props);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  public changeName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new BusinessRuleError('User name cannot be empty.');
    }
    this._name = newName.trim();
  }
}
