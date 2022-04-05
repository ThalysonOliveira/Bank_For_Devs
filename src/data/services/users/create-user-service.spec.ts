import { BankAccount } from '../../../domain/models/bank-account'
import { CreateBankAccount } from '../../../domain/useCases/bankAccount/create-bank-account'
import { UserEntity } from '../../entities/user'
import { SendAccountCreationEmail } from '../../protocols/email/account-creation-email'
import { Encrypter } from '../../protocols/encrypter'
import {
  CreateUserRepository,
  UserEntityData
} from '../../repositories/users/create-user-repository'
import { CreateUserService } from './create-user-service'

type SutTypes = {
  sut: CreateUserService;
  encrypterStub: Encrypter;
  createBankAccountStub: CreateBankAccount;
  createUserRepositoryStub: CreateUserRepository;
  sendAccountCreationEmailStub: SendAccountCreationEmail
};

const makeSendAccountCreationEmail = (): SendAccountCreationEmail => {
  class SendAccountCreationEmailStub implements SendAccountCreationEmail {
    async execute (): Promise<void> {
      return new Promise((resolve) => resolve())
    }
  }

  return new SendAccountCreationEmailStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeCreateBankAccount = (): CreateBankAccount => {
  class CreateBankAccountStub implements CreateBankAccount {
    async execute (): Promise<BankAccount> {
      const fakeBankAccount = {
        id: 1,
        name: 'radon_name',
        type: 'any_type',
        agency: 1,
        number: 1,
        balance: 0,
        created_at: 'any_data' as unknown as Date
      }
      return new Promise((resolve) => resolve(fakeBankAccount))
    }
  }
  return new CreateBankAccountStub()
}

const makeCreateUserRepository = (): CreateUserRepository => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async execute (userEntityData: UserEntityData): Promise<UserEntity> {
      const fakeUser = {
        id: 1,
        name: 'any_name',
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj',
        password: 'hashed_password',
        id_bank_account: 1
      }

      return new Promise((resolve) => resolve(fakeUser))
    }
  }

  return new CreateUserRepositoryStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()

  const createBankAccountStub = makeCreateBankAccount()

  const createUserRepositoryStub = makeCreateUserRepository()

  const sendAccountCreationEmailStub = makeSendAccountCreationEmail()

  const sut = new CreateUserService(
    encrypterStub,
    createBankAccountStub,
    createUserRepositoryStub,
    sendAccountCreationEmailStub
  )

  return {
    sut,
    encrypterStub,
    createBankAccountStub,
    createUserRepositoryStub,
    sendAccountCreationEmailStub
  }
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

    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

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

    jest.spyOn(createBankAccountStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute(userData)

    await expect(promise).rejects.toThrow()
  })

  test('Should call SendAccountCreationEmail', async () => {
    const { sut, sendAccountCreationEmailStub } = makeSut()

    const userData = {
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    }

    const sendAccountCreationEmailSpy = jest.spyOn(sendAccountCreationEmailStub, 'execute')

    await sut.execute(userData)

    expect(sendAccountCreationEmailSpy).toBeCalled()
  })

  test('Should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut()

    const userData = {
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    }

    const createUserRepositorySpy = jest.spyOn(
      createUserRepositoryStub,
      'execute'
    )

    await sut.execute(userData)

    expect(createUserRepositorySpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'hashed_password'
    })
  })

  test('Should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut()

    const userData = {
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    }

    jest
      .spyOn(createUserRepositoryStub, 'execute')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promise = sut.execute(userData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return a user on success', async () => {
    const { sut } = makeSut()

    const userData = {
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    }

    const user = await sut.execute(userData)

    expect(user).toEqual({
      id: 1,
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'hashed_password',
      id_bank_account: 1
    })
  })
})
