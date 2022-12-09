import { Role } from "src/enum/role.enum"


export class FindAllUsersDTO {
    name?: string

    email?: string

    documentId?: string

    role?: Role

    pageNumber? = 0

    pageSize? = 10
}