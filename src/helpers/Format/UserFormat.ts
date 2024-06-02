import MtUser from "../../database/models/MtUser"

export interface LoginFormatter{
  name: string,
  email: string,
  token: string
}

export function FormatLogin(user:MtUser): LoginFormatter{
  const format: LoginFormatter = {
    name: user.dataValues.name,
    email: user.dataValues.email,
    token: user.dataValues.token
  }

  return format
}