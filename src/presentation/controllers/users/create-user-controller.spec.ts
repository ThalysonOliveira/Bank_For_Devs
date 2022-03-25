import { badRequest } from '../../helpers/http-helpers'
import { CreateUserController } from './create-user-controller'

describe('Create User Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = new CreateUserController()

    const httpRequest = {
      body: {
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Missing param: name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const sut = new CreateUserController()

    const httpRequest = {
      body: {
        name: 'any_name',
        cpfCnpj: 'any_cpfCnpj',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Missing param: email'))
  })

  test('Should return 400 if no cpf or cnpj is provided', async () => {
    const sut = new CreateUserController()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Missing param: cpfCnpj'))
  })

  test('Should return 400 if no password is provided', async () => {
    const sut = new CreateUserController()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        cpfCnpj: 'any_cpfCnpj'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest('Missing param: password'))
  })
})
