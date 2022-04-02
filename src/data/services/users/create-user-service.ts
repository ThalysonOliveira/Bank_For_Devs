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
    const hashedPassword = await this.encrypter.encrypt(userData.password)

    Object.assign(userData, { password: hashedPassword })

    const bankAccount = await this.createBankAccount.execute()

    const user = await this.createUserRepository.execute(userData)

    Object.assign(user, { id_bank_account: bankAccount.id })

    return user
  }
}

export { CreateUserService }
