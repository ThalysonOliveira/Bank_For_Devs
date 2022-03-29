import { BankAccountEntity } from '../../entities/bank-account'
import { CreateBankAccountRepository } from '../../repositories/bankAccount/create-bank-account-repository'
import { CreateBankAccountService } from './create-bank-account-service'

describe('Create Bank Account', () => {
  test('Should call CreateBankAccountRepository with successfully', async () => {
    class CreateBankAccountRepositoryStub implements CreateBankAccountRepository {
      async execute (): Promise<BankAccountEntity> {
        const fakeBankAccount = {
          id: 1,
          name: 'radon_name',
          type: 'any_type',
          agency: 1,
          number: 1,
          balance: 0,
          created_at: new Date()
        }

        return new Promise(resolve => resolve(fakeBankAccount))
      }
    }

    const createBankAccountRepositoryStub = new CreateBankAccountRepositoryStub()

    const sut = new CreateBankAccountService(createBankAccountRepositoryStub)

    const createBankAccountRepositoryStubSpy = jest.spyOn(createBankAccountRepositoryStub, 'execute')

    await sut.execute()

    expect(createBankAccountRepositoryStubSpy).toHaveBeenCalled()
  })
})
