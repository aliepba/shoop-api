import MtUser, { UserAttributes } from "../database/models/MtUser";
import * as yup from 'yup'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { FormatLogin, LoginFormatter } from "../helpers/Format/UserFormat";
import { AuthReq } from "config/auth";

const regisSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  phone: yup.string().required()
});

export class UserService{  

  jwtCode: any;

  constructor(){
    this.jwtCode = process.env.JWT_ENCODE;
  }

  async list() : Promise<UserAttributes[]>{
    const datas = await MtUser.findAll()
    const jsonResult = datas.map((item) => item.toJSON()) as UserAttributes[]
    return jsonResult
  }

  async login(email: string, password: string): Promise<{user: LoginFormatter}>{
    const user = await MtUser.findOne({where: {email : email}})
    if(!user){throw new Error("User not found")}

    const cekPass = await bcrypt.compare(password, user.dataValues.password)

    if(!cekPass){throw new Error("Wrong Password")}

    const token = jwt.sign(user.dataValues, this.jwtCode)

    user.dataValues.token = token
    await user.save

    const formattedData = FormatLogin(user)

    return {user:formattedData}
  
  }

  async create(userDetail: UserAttributes) : Promise<UserAttributes>{
    
    await regisSchema.validate(userDetail);

    const user = await MtUser.create({
      ...userDetail,
      role : 'user'
    })
    return user.toJSON() as UserAttributes
  }

  async findByUser(req:AuthReq): Promise<UserAttributes>{
    const user: any = req.user;
    const data = await MtUser.findByPk(user.id)
    return data?.toJSON() as UserAttributes
  }
}