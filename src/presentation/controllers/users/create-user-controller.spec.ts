import { User } from '../../../domain/models/user'
import { CreateUser, UserData } from '../../../domain/useCases/users/create-user'
import { badRequest } from '../../helpers/http-helpers'
import { EmailValidator } from '../../protocols/email-validator'
import { CreateUserController } from './create-user-controller'

type SutTypes = {
  sut: CreateUserController;
  emailValidatorStub: EmailValidator
  createUserStub: CreateUser
};

const makeCreateUser = (): CreateUser => {
  class CreateUserStub implements CreateUser {
    execute (userData: UserData): Promise<User> {
      const fakeUser: User = {
        id: 1,
        name: 'fake_name',
        email: 'fake_email',
        cpfCnpj: 'fake_cpfCnpj',
        password: 'fake_password',
        id_bank_account: 1
      }
      return new Promise(resolve => resolve(fakeUser))
    }
  }

  return new CreateUserStub()
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (value: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const createUserStub = makeCreateUser()
  const sut = new CreateUserController(emailValidatorStub, createUserStub)

  return { sut, emailValidatorStub, createUserStub }
}

describe('Create User Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Missing param: name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Missing param: email'))
  })

  test('Should return 400 if no cpf or cnpj is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Missing param: cpfCnpj'))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Missing param: password'))
  })

  test('Should call EmailValidator with correct values', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.handle(httpRequest)

    expect(emailValidatorSpy).toBeCalledWith('any_email')
  })

  test('Should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Invalid email'))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.message).toBe('Internal Error Server')
  })

  test('Should call CreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    const createUserSpy = jest.spyOn(createUserStub, 'execute')

    await sut.handle(httpRequest)

    expect(createUserSpy).toBeCalledWith({
      name: 'any_name',
      email: 'any_email',
      cpfCnpj: 'any_cpfCnpj',
      password: 'any_password'
    })
  })

  test('Should return 500 if CreateUser throws', async () => {
    const { sut, createUserStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    jest.spyOn(createUserStub, 'execute').mockImplementationOnce(() => { throw new Error() })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.message).toBe('Internal Error Server')
  })

  test('Should call isCnpjOuCnpj with correct values', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        cpfCnpj: 'valid_cpfCnpj',
        password: 'any_password'
      }
    }

    const sutSpy = jest.spyOn(sut, 'isCnpjOuCnpj')

    await sut.handle(httpRequest)

    expect(sutSpy).toHaveBeenCalledWith('valid_cpfCnpj')
  })
})
