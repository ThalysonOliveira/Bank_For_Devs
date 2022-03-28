import { CreateUser } from '../../../domain/useCases/users/create-user'
import { badRequest, serverError } from '../../helpers/http-helpers'
import { CnpjValidator } from '../../protocols/cnpj-validator'
import { Controller } from '../../protocols/controller'
import { CpfValidator } from '../../protocols/cpf-validator'
import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols/http'

class CreateUserController implements Controller {
  constructor (
    private emailValidator: EmailValidator,
    private cpfValidator: CpfValidator,
    private cnpjValidator: CnpjValidator,
    private createUser: CreateUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'cpfCnpj', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(`Missing param: ${field}`)
        }
      }

      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!emailIsValid) return badRequest('Invalid email')

      const { name, email, cpfCnpj, password } = httpRequest.body

      const isCpfOrCnpj = this.isCpfOrCnpj(cpfCnpj)

      const isValidCpf = this.cpfValidator.isValid(cpfCnpj)

      if (isCpfOrCnpj && !isValidCpf) return badRequest('Invalid cpf')

      const isValidCnpj = this.cnpjValidator.isValid(cpfCnpj)

      if (!isCpfOrCnpj && !isValidCnpj) return badRequest('Invalid cnpj')

      await this.createUser.execute({ name, email, cpfCnpj, password })

      return {
        statusCode: 201
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }

  isCpfOrCnpj (value: string): boolean {
    return value.length === 11 ? true : false
  }
}

export { CreateUserController }
