import { BankAccountEntity } from '../../entities/bank-account'

interface CreateBankAccountRepository {
  execute: () => Promise<BankAccountEntity>
}

export { CreateBankAccountRepository }
