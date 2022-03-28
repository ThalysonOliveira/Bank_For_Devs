import { CnpjValidatorAdapter } from './cnpj-validator-adapter'
import { cnpj } from 'cpf-cnpj-validator'

jest.mock('cpf-cnpj-validator', () => ({
  cnpj: {
    isValid ():boolean {
      return true
    }
  }
}))

describe('Cnpj Validator Adapter', () => {
  test('Should return false if cpf-cnpj-validator return false', () => {
    const sut = new CnpjValidatorAdapter()

    jest.spyOn(cnpj, 'isValid').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_cnpj')

    expect(isValid).toBe(false)
  })

  test('Should return true if cpf-cnpj-validator return true', () => {
    const sut = new CnpjValidatorAdapter()

    const isValid = sut.isValid('valid_cnpj')

    expect(isValid).toBe(true)
  })
})
