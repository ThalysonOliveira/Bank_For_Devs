import { EmailValidator } from '../../presentation/protocols'
import validator from 'validator'

class EmailValidatorAdapter implements EmailValidator {
  isValid (value: string): boolean {
    return validator.isEmail(value)
  };
}

export { EmailValidatorAdapter }
