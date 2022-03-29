import { BankAccountEntity } from '../../entities/bank-account'
import { CreateBankAccountRepository } from '../../repositories/bankAccount/create-bank-account-repository'
import { CreateBankAccountService } from './create-bank-account-service'

type SutTypes = {
  sut: CreateBankAccountService,
  createBankAccountRepositoryStub: CreateBankAccountRepository
}

const makeCreateBankAccountRepositoryStub = (): CreateBankAccountRepository => {
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
  return new CreateBankAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const createBankAccountRepositoryStub = makeCreateBankAccountRepositoryStub()

  const sut = new CreateBankAccountService(createBankAccountRepositoryStub)

  return { sut, createBankAccountRepositoryStub }
}

describe('Create Bank Account', () => {
  test('Should call CreateBankAccountRepository with successfully', async () => {
    const { sut, createBankAccountRepositoryStub } = makeSut()

    const createBankAccountRepositoryStubSpy = jest.spyOn(createBankAccountRepositoryStub, 'execute')

    await sut.execute()

    expect(createBankAccountRepositoryStubSpy).toHaveBeenCalled()
  })

  test('Should throw if CreateBankAccountRepository throws', async () => {
    const { sut, createBankAccountRepositoryStub } = makeSut()

    jest.spyOn(createBankAccountRepositoryStub, 'execute')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.execute()

    await expect(promise).rejects.toThrow()
  })
})
