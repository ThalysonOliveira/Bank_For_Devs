import { CpfValidator } from '../../presentation/protocols'

class CpfValidatorAdapter implements CpfValidator {
  isValid (value: string) : boolean {
    return false
  };
}

export { CpfValidatorAdapter }
