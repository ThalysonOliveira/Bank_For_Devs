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
  })
})
