import { User } from '../../../domain/models/user'
import { CreateBankAccount } from '../../../domain/useCases/bankAccount/create-bank-account'
import {
  CreateUser,
  UserData
} from '../../../domain/useCases/users/create-user'
import { Encrypter } from '../../protocols/encrypter'

class CreateUserService implements CreateUser {
  constructor (
    private encrypter: Encrypter,
    private createBankAccount: CreateBankAccount
  ) {}

  async execute (userData: UserData): Promise<User> {
    await this.encrypter.encrypt(userData.password)

    this.createBankAccount.execute()

    return new Promise(resolve => resolve(null as unknown as User))
  }
}

export { CreateUserService }
