import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindAllUsersDTO } from './dto/find-all-users.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get('me')
    async me(@Req() req: Request) {
        return req.user
    }

    @Roles(Role.Admin)
    @Get('list')
    async findAll(@Query() filters?) {
        return this.userService.findAll(filters)
    }

    @Roles(Role.Admin)
    @Get(':id')
    async findById(@Param() id) {
        return this.userService.findById(id)
    }

    @Roles(Role.Admin)
    @Post()
    async create(@Body() body: CreateUserDTO) {
        return this.userService.create(body)
    }

    @Roles(Role.Admin)
    @Put()
    async update(@Body() body) {
        return this.userService.create(body)
    }
}
