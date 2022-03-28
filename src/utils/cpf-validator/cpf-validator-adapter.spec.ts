import { CpfValidatorAdapter } from './cpf-validator-adapter'
import { cpf } from 'cpf-cnpj-validator'

jest.mock('cpf-cnpj-validator', () => ({
  cpf: {
    isValid ():boolean {
      return true
    }
  }
}))

describe('Cpf Validator Adapter', () => {
  test('Should return false if cpf-cnpj-validator return false', () => {
    const sut = new CpfValidatorAdapter()

    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(false)

    const isValid = sut.isValid('any_cpfCnpj')

    expect(isValid).toBe(false)
  })

  test('Should return true is cpf-cnpj-validator return true', () => {
    const sut = new CpfValidatorAdapter()

    const isValid = sut.isValid('any_cpfCnpj')

    expect(isValid).toBe(true)
  })

  test('Should CpfValidatorAdapter call cpf-cnpj-validator with correct value', () => {
    const sut = new CpfValidatorAdapter()

    const cpfCnpjValidatorSpy = jest.spyOn(cpf, 'isValid')

    sut.isValid('any_cpfCnp')

    expect(cpfCnpjValidatorSpy).toHaveBeenCalledWith('any_cpfCnp')
  })
})
