import { HttpResponse } from '../protocols/http'

const badRequest = (message: string, data?: unknown): HttpResponse => {
  return ({
    statusCode: 400,
    body: {
      success: false,
      message,
      data
    }
  })
}

const created = (message?: string): HttpResponse => {
  return ({
    statusCode: 201,
    body: {
      message
    }
  })
}

const serverError = (error?: Error):HttpResponse => {
  console.log(error?.stack)

  return ({
    statusCode: 500,
    body: {
      message: 'Internal error server'
    }
  })
}

export { badRequest, serverError, created }
