import { EntityDTO } from "@mikro-orm/core"
import { User } from "src/users/entities/user.entity"
import { Role } from '../../entities/role.enum';

export interface UserResponse extends EntityDTO<User>{
    id: number
    username: string
    namaLengkap:string
    role:Role
}