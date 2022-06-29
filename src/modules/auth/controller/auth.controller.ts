import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { AuthCredentialDto } from '../dto/auth-credentials.dto';
import { AuthSignIn } from '../dto/auth-singIn.dto';
import { Role } from 'src/constants/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from '../entities/user.entity';
import { UpdateInformationDto } from '../dto/update-information.dto';
import { getUser } from 'src/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<string> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body() authSignIn: AuthSignIn): Promise<{ accessToken: string }> {
        return this.authService.signIn(authSignIn);
    }
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/user')
    @Roles(Role.ADMIN)
    getAllUsers(): Promise<User[]> {
        return this.authService.getAllUsers();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/user/:username')
    @Roles(Role.ADMIN)
    getUserTask(@Param('username') username: string): Promise<User[]> {
        return this.authService.getUserTask(username);
    }

    @UseGuards(AuthGuard())
    @Patch('/user/:username/update')
    async updateInformation(
        @Param('username') username:string,
         @Body() updateInformationDto: UpdateInformationDto,
         @getUser() user: User):Promise<User[]>{
        console.log(username,user.username)
        return  this.authService.UpdateUser(username,updateInformationDto,user)
    }

}

