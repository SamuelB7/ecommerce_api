import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() body: SignUpDTO) {
        return this.authService.signUp(body);
    }

    @Post('signin')
    signIn(@Body() body: SignInDTO) {
        return this.authService.signIn(body);
    }
}
