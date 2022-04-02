import { User } from '../../../domain/models/user'
import { CreateBankAccount } from '../../../domain/useCases/bankAccount/create-bank-account'
import {
  CreateUser,
  UserData
} from '../../../domain/useCases/users/create-user'
import { Encrypter } from '../../protocols/encrypter'
import { CreateUserRepository } from '../../repositories/users/create-user-repository'

class CreateUserService implements CreateUser {
  constructor (
    private encrypter: Encrypter,
    private createBankAccount: CreateBankAccount,
    private createUserRepository: CreateUserRepository
  ) {}

  async execute (userData: UserData): Promise<User> {
    await this.encrypter.encrypt(userData.password)

    this.createBankAccount.execute()

    await this.createUserRepository.execute(userData)

    return new Promise(resolve => resolve(null as unknown as User))
  }
}

export { CreateUserService }
