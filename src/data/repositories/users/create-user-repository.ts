import { UserData } from '../../../domain/useCases/users/create-user'
import { UserEntity } from '../../entities/user'

type UserEntityData = UserData

interface CreateUserRepository{
  execute :(userEntityData: UserEntityData) => Promise<UserEntity>
}

export { CreateUserRepository, UserEntityData }
