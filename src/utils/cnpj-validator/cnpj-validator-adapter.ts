import { CnpjValidator } from '../../presentation/protocols'
import { cnpj } from 'cpf-cnpj-validator'

class CnpjValidatorAdapter implements CnpjValidator {
  isValid (value: string) : boolean {
    return cnpj.isValid(value)
  };
}

export { CnpjValidatorAdapter }
