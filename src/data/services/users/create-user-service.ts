import { User } from '../../../domain/models/user'
import {
  CreateUser,
  UserData
} from '../../../domain/useCases/users/create-user'
import { Encrypter } from '../../protocols/encrypter'

class CreateUserService implements CreateUser {
  constructor (private encrypter: Encrypter) {}

  async execute (userData: UserData): Promise<User> {
    await this.encrypter.encrypt(userData.password)

    return new Promise(resolve => resolve(null as unknown as User))
  }
}

export { CreateUserService }
