import { badRequest } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols/http'

class CreateUserController implements Controller {
  constructor (private emailValidator:EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'cpfCnpj', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(`Missing param: ${field}`)
      }
    }

    const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!emailIsValid) return badRequest('Invalid email')

    return {
      statusCode: 201
    }
  }
}

export { CreateUserController }
