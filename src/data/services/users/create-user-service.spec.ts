import { Encrypter } from '../../protocols/encrypter'
import { CreateUserService } from './create-user-service'

describe('Create User Service', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new CreateUserService(encrypterStub)

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
})
