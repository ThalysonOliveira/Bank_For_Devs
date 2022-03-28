import { CnpjValidator } from '../../presentation/protocols'

class CnpjValidatorAdapter implements CnpjValidator {
  isValid (value: string) : boolean {
    return false
  };
}

export { CnpjValidatorAdapter }
