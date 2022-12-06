import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SignInDTO } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor (
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async signToken(userId: number, email: string, role: string ) {
        const payload = {
            sub: userId,
            email,
            role
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: process.env.JWT_SECRET
        })

        return {
            access_token: token
        }
    }

    async signUp(body: SignUpDTO) {
        try {
            const hash = await bcrypt.hash(body.password, 7);

            const user = await this.prisma.user.create({
                data: {
                    ...body,
                    password: hash
                }
            });

            return this.signToken(user.id, user.email, user.role)
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('User already registered')
                }
            }

            throw error
        }
    }

    async signIn(body: SignInDTO) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if(!user) {
            throw new ForbiddenException('Incorrect password or email')
        }

        const correctPassword = await bcrypt.compare(body.password, user.password)

        if(!correctPassword) {
            throw new ForbiddenException('Incorrect password or email')
        }

        return this.signToken(user.id, user.email, user.role)
    }
}
