import { BankAccount } from '../../../domain/models/bank-account'
import { CreateBankAccount } from '../../../domain/useCases/bankAccount/create-bank-account'
import { Encrypter } from '../../protocols/encrypter'
import { CreateUserService } from './create-user-service'

type SutTypes = {
  sut: CreateUserService
  encrypterStub: Encrypter
  createBankAccountStub: CreateBankAccount
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeCreateBankAccount = (): CreateBankAccount => {
  class CreateBankAccountStub implements CreateBankAccount {
    async execute () :Promise<BankAccount> {
      const fakeBankAccount = {
        id: 1,
        name: 'radon_name',
        type: 'any_type',
        agency: 1,
        number: 1,
        balance: 0,
        created_at: 'any_data' as unknown as Date
      }
      return new Promise(resolve => resolve(fakeBankAccount))
    }
  }
  return new CreateBankAccountStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()

  const createBankAccountStub = makeCreateBankAccount()

  const sut = new CreateUserService(encrypterStub, createBankAccountStub)

  return { sut, encrypterStub, createBankAccountStub }
}

describe('Create User Service', () => {
  const { sut, encrypterStub } = makeSut()

  test('Should call Encrypter with correct password', async () => {
    const userData = {
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    }

    const encrypterStubSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.execute(userData)

    expect(encrypterStubSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    const userData = {
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    }

    jest.spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.execute(userData)

    await expect(promise).rejects.toThrow()
  })

  test('Should call CreateBankAccount with success', async () => {
    const { sut, createBankAccountStub } = makeSut()

    const userData = {
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    }

    const createBankAccountSpy = jest.spyOn(createBankAccountStub, 'execute')

    await sut.execute(userData)

    expect(createBankAccountSpy).toHaveBeenCalled()
  })

  test('Should throw if CreateBankAccount throws', async () => {
    const { sut, createBankAccountStub } = makeSut()

    const userData = {
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    }

    jest.spyOn(createBankAccountStub, 'execute')
      .mockImplementationOnce(() => { throw new Error() })

    const promise = sut.execute(userData)

    await expect(promise).rejects.toThrow()
  })
})
