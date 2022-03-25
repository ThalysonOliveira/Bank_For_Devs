import { User } from '../../models/user'

type UserData = {
  name: string,
  email: string
  cpfCnpj: string,
  password: string
}

interface CreateUser{
  execute :(userData: UserData)=> Promise<User>
}

export { UserData, CreateUser }
