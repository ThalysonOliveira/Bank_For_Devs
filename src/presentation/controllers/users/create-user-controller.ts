import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

class CreateUserController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: { message: 'Missing param: name' }
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: { message: 'Missing param: email' }
      }
    }

    if (!httpRequest.body.cpf_cnpj) {
      return {
        statusCode: 400,
        body: { message: 'Missing param: CPF/CNPJ' }
      }
    }

    return {
      statusCode: 201
    }
  }
}

export { CreateUserController }
