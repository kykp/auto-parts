export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  loginAt: Date
  blocked: boolean
  blockedAt: Date
}

export interface UserProfileSchema {
  me: User | null
  isAuth: boolean
}


export interface UserRegistrationSchema {
  email: string;
  password: string;
}
