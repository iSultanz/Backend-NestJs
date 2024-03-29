import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { AuthCredentialDto } from '../dto/auth-credentials.dto';
import { AuthSignIn } from '../dto/auth-singIn.dto';
import { Role } from '../../../constants/role.enum';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';
import { User } from '../entities/user.entity';
import { UpdateInformationDto } from '../dto/update-information.dto';
import { getUser } from '../../../decorators/get-user.decorator';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
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
        @Param('username') username: string,
        @Body() updateInformationDto: UpdateInformationDto,
        @getUser() user: User): Promise<User[]> {
        return this.authService.UpdateUser(username, updateInformationDto, user)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('/user/admin/delete/:username')
    @Roles(Role.ADMIN)
    DeleteUserByAdmin(@Param('username') username: string) {
        return this.authService.DeleteUserByAdmin(username);

    }
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/users/admin/getAllTasks')
    @Roles(Role.ADMIN)
    getTasksOfAllUsers(): Promise<User[]> {
        return this.authService.getTasksOfAllUsers();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Patch('/user/admin/restore/:username')
    @Roles(Role.ADMIN)
    RestoreUserByAdmin(@Param('username') username: string) {
        return this.authService.RestoreUserByAdmin(username)
    }

}

