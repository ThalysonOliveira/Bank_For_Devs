class CreateUserController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        message: 'Missing param: name'
      }
    }
  }
}

export { CreateUserController }
