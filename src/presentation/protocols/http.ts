type HttpRequest = {
  body: any;
};

type HttpResponse = {
  statusCode: number;
  body?: any;
};

export { HttpRequest, HttpResponse }
