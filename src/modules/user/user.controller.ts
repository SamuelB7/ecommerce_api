import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
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
    @Get()
    async findAll() {
        return this.userService.findAll()
    }
}
