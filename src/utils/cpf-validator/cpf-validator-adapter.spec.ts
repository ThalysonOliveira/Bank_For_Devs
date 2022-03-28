import { CpfValidatorAdapter } from './cpf-validator-adapter'
import { cpf } from 'cpf-cnpj-validator'

jest.mock('cpf-cnpj-validator', () => ({
  cpf: {
    isValid ():boolean {
      return true
    }
  }
}))

const makeSut = (): CpfValidatorAdapter => new CpfValidatorAdapter()

describe('Cpf Validator Adapter', () => {
  test('Should return false if cpf-cnpj-validator return false', () => {
    const sut = makeSut()

    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_cpf')

    expect(isValid).toBe(false)
  })

  test('Should return true is cpf-cnpj-validator return true', () => {
    const sut = makeSut()

    const isValid = sut.isValid('invalid_cpf')

    expect(isValid).toBe(true)
  })

  test('Should CpfValidatorAdapter call cpf-cnpj-validator with correct value', () => {
    const sut = makeSut()

    const cpfCnpjValidatorSpy = jest.spyOn(cpf, 'isValid')

    sut.isValid('any_cpf')

    expect(cpfCnpjValidatorSpy).toHaveBeenCalledWith('any_cpf')
  })
})
