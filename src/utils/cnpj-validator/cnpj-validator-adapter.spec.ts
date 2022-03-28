import { CnpjValidatorAdapter } from './cnpj-validator-adapter'
import { cnpj } from 'cpf-cnpj-validator'

jest.mock('cpf-cnpj-validator', () => ({
  cnpj: {
    isValid ():boolean {
      return true
    }
  }
}))

const makeSut = (): CnpjValidatorAdapter => {
  return new CnpjValidatorAdapter()
}

describe('Cnpj Validator Adapter', () => {
  test('Should return false if cpf-cnpj-validator return false', () => {
    const sut = makeSut()

    jest.spyOn(cnpj, 'isValid').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_cnpj')

    expect(isValid).toBe(false)
  })

  test('Should return true if cpf-cnpj-validator return true', () => {
    const sut = makeSut()

    const isValid = sut.isValid('valid_cnpj')

    expect(isValid).toBe(true)
  })

  test('Should CnpjValidatorAdapter call cpf-cnpj-validator with correct value ', () => {
    const sut = makeSut()

    const cpfCnpjValidatorSpy = jest.spyOn(cnpj, 'isValid')

    sut.isValid('any_cnpj')

    expect(cpfCnpjValidatorSpy).toHaveBeenCalledWith('any_cnpj')
  })
})
