import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthAccess } from 'src/entities/auth-access.entity';
import { UserRegisterInput } from './dto/register-user.input';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

    async signUp(data: UserRegisterInput): Promise<AuthAccess> {
        try {
            let passwordHash = await hash(data.password, 10);

            let user = await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: passwordHash,
                    role: UserRoleEnum.USER,
                }
            })

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }

            return {
                accessToken: this.jwt.sign(payload, {
                    expiresIn: '24h',
                    secret: process.env.JWT_SECRET,
                }),
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Error('Email already exists');
                }
            }
            throw new Error('Internal server error');
        }
    }

    async signIn(data: LoginInput): Promise<AuthAccess> {
        let user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        let passwordMatch = await compare(data.password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }

        return {
            accessToken: this.jwt.sign(payload, {
                expiresIn: '24h',
                secret: process.env.JWT_SECRET,
            }),
        }
    }
}