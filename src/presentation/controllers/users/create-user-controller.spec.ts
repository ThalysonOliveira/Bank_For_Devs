import { CreateUserController } from './create-user-controller'

describe('Create User Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = new CreateUserController()

    const httpRequest = {
      body: {
        email: 'any_email',
        cpf_cnpj: 'any_cpf_cnpj',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toBe('Missing param: name')
  })

  test('Should return 400 if no email is provided', async () => {
    const sut = new CreateUserController()

    const httpRequest = {
      body: {
        name: 'any_name',
        cpf_cnpj: 'any_cpf_cnpj',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toBe('Missing param: email')
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

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toBe('Missing param: CPF/CNPJ')
  })
})
