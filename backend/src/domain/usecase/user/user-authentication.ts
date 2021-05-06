import { User } from '@/domain/model/user'

export interface AuthenticationModel {
  registration: string
  password: string
}

export interface UserAuthentication {
  auth(auth: AuthenticationModel): Promise<{token: string, userAccount: Omit<User, 'id' | 'password'> }>
}
