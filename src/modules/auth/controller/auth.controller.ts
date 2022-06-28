import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service'; 
import { AuthCredentialDto } from '../dto/auth-credentials.dto'; 
import { AuthSignIn } from '../dto/auth-singIn.dto';
import { Role } from 'src/constants/role.enum'; 
import { Roles } from 'src/decorators/roles.decorator'; 
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from '../entities/user.entity'; 

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialDto  ): Promise<string>{
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body() authSignIn: AuthSignIn): Promise<{ accessToken: string }>{
        return this.authService.signIn(authSignIn);
    }
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Get('/user')
    @Roles(Role.ADMIN)
    getAllUsers(): Promise<User[]>{
        return this.authService.getAllUsers();
    }

}
