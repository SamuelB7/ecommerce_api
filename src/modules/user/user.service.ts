import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllUsersDTO } from './dto/find-all-users.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}

    async findAll({
        pageNumber,
        pageSize,
        documentId,
        email,
        name,
        role
    }: FindAllUsersDTO) {

        if(!pageSize) {
            pageSize = 10
        }

        if(!pageNumber) {
            pageNumber = 0
        }

        pageSize = Number(pageSize)
        pageNumber = Number(pageNumber)
        
        const options = {
            skip: pageNumber,
            take: pageSize,
            where:{},
        }

        if(name) {
            options.where['name'] = name
        }

        if(email) {
            options.where['email'] = email
        }

        if(documentId) {
            options.where['documentId'] = documentId
        }

        if(role) {
            options.where['role'] = role
        }

        const users = await this.prisma.user.findMany(options)
        const count = await this.prisma.user.count()
        return {users, count}
    }
}
