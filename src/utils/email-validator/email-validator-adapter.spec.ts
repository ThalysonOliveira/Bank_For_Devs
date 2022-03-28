import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  test('Should return false if validator return false ', () => {
    const sut = new EmailValidatorAdapter()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_email@email.com')

    expect(isValid).toBe(false)
  })

  test('Should return true if validator return true', () => {
    const sut = new EmailValidatorAdapter()

    const isValid = sut.isValid('valid_email@email.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()

    const validatorSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('any_email@email.com')

    expect(validatorSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
