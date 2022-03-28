import { CnpjValidatorAdapter } from './cnpj-validator-adapter'

describe('Cnpj Validator Adapter', () => {
  test('Should return false if cpf-cnpj-validator return false', () => {
    const sut = new CnpjValidatorAdapter()

    const isValid = sut.isValid('invalid_cnpj')

    expect(isValid).toBe(false)
  })
})
