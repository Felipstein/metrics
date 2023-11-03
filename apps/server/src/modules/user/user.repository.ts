import { UserEntity } from '../../entities/UserEntity';

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
}
