import { badRequest } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

class CreateUserController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'cpfCnpj', 'password']

    for (const field of requiredFields) {
      console.log(field)

      if (!httpRequest.body[field]) {
        return badRequest(`Missing param: ${field}`)
      }
    }

    return {
      statusCode: 201
    }
  }
}

export { CreateUserController }
