import { CpfValidator } from '../../presentation/protocols'
import { cpf } from 'cpf-cnpj-validator'

class CpfValidatorAdapter implements CpfValidator {
  isValid (value: string) : boolean {
    return cpf.isValid(value)
  };
}

export { CpfValidatorAdapter }
