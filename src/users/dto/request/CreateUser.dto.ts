import { IsNotEmpty } from "class-validator";

export  class CreateUserDto {
    @IsNotEmpty()
    readonly username!: string
    @IsNotEmpty()
    readonly namaLengkap!:string
    @IsNotEmpty()
    readonly password!:string
}
