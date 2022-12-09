import { IsNotEmpty, IsString } from "class-validator"
import { Role } from "src/enum/role.enum"

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    documentId: string

    @IsString()
    @IsNotEmpty()
    password: string
    
    @IsString()
    @IsNotEmpty()
    role: Role
}