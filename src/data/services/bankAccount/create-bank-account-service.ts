import { BankAccount } from '../../../domain/models/bank-account'
import { CreateBankAccount } from '../../../domain/useCases/bankAccount/create-bank-account'
import { CreateBankAccountRepository } from '../../repositories/bankAccount/create-bank-account-repository'

class CreateBankAccountService implements CreateBankAccount {
  constructor (private createBankAccountRepository: CreateBankAccountRepository) {}

  async execute () : Promise<BankAccount> {
    await this.createBankAccountRepository.execute()

    return new Promise((resolve) => resolve(null as unknown as BankAccount))
  };
}

export { CreateBankAccountService }
