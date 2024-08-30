export interface User {
  id: string
  name?: string
  email: string
}

export interface UserProfileSchema {
  me: User | null
  isAuth: boolean
}


export interface UserRegistrationSchema {
  email: string;
  password: string;
}
