import MtUser from "../../database/models/MtUser"

export interface LoginFormatter{
  id: number,
  name: string,
  email: string,
  token: string,
  phone: number | string,
}

export function FormatLogin(user:MtUser): LoginFormatter{
  const format: LoginFormatter = {
    id: user.dataValues.id,
    name: user.dataValues.name,
    email: user.dataValues.email,
    token: user.dataValues.token,
    phone: user.dataValues.phone
  }

  return format
}