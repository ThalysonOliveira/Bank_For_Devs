import { EmailValidator } from '../../presentation/protocols'

class EmailValidatorAdapter implements EmailValidator {
  isValid (value: string): boolean {
    return false
  };
}

export { EmailValidatorAdapter }
