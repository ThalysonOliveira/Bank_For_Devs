import { CpfValidatorAdapter } from './cpf-validator-adapter'

describe('Cpf Validator Adapter', () => {
  test('Should return false if cpf-cnpj-validator return false', () => {
    const sut = new CpfValidatorAdapter()

    const isValid = sut.isValid('any_cpfCnpj')

    expect(isValid).toBe(false)
  })
})
