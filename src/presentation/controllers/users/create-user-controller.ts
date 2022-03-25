class CreateUserController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        message: 'Missing param: name'
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        message: 'Missing param: email'
      }
    }

    if (!httpRequest.body.cpf_cnpj) {
      return {
        statusCode: 400,
        message: 'Missing param: CPF/CNPJ'
      }
    }
  }
}

export { CreateUserController }
