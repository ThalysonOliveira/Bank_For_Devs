import { Encrypter } from '../../protocols/encrypter'
import { CreateUserService } from './create-user-service'

type SutTypes = {
  sut: CreateUserService
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()

  const sut = new CreateUserService(encrypterStub)

  return { sut, encrypterStub }
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
})
