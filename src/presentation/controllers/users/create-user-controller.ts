import { CreateUser } from '../../../domain/useCases/users/create-user'
import { badRequest } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols/http'

class CreateUserController implements Controller {
  constructor (private emailValidator:EmailValidator, private createUser: CreateUser) {}

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

      await this.createUser.execute({ name, email, cpfCnpj, password })

      return {
        statusCode: 201
      }
    } catch (error) {
      return ({
        statusCode: 500,
        body: {
          message: 'Internal Error Server'
        }
      })
    }
  }
}

export { CreateUserController }
