import { badRequest } from '../../helpers/http-helpers'
import { EmailValidator } from '../../protocols/email-validator'
import { CreateUserController } from './create-user-controller'

type SutTypes = {
  sut: CreateUserController;
  emailValidatorStub: EmailValidator
};

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
  const sut = new CreateUserController(emailValidatorStub)

  return { sut, emailValidatorStub }
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
})
