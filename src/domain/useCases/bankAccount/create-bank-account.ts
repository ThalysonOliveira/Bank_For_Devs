import { BankAccount } from '../../models/bank-account'

interface CreateBankAccount {
  execute: () => Promise<BankAccount>;
}

export { CreateBankAccount }
