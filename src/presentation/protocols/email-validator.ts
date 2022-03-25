interface EmailValidator{
  isValid : (value: string)=> Promise<boolean>
}

export { EmailValidator }
