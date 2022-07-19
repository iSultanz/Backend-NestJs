import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt'
import { AuthSignIn } from '../dto/auth-singIn.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { UpdateInformationDto } from '../dto/update-information.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        public userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { username, password, roles, firstName, lastName, email } = authCredentialDto;

        //hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            roles,
            firstName,
            lastName,
            email,
        });
        try {
            await this.userRepository.save(user);
            return 'User has been registered successfully';
        } catch (error) {
            if (error.code === '23505') { //duplicate username
                throw new ConflictException('Username is already used');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }



    async signIn(authSignIn: AuthSignIn): Promise<{ accessToken: string }> {
        const { username, password } = authSignIn;
        const user = await this.userRepository.findOne({ where: { username: username } })

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username, };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('username or password is incorrect');
        }
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.createQueryBuilder('user')
            .select(['user.id', 'user.username', 'user.roles']).getMany()
    }
    async getUserTask(username: string): Promise<User[]> {
        const tasks = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect("user.tasks", "Tasks")
            .where('(LOWER(user.username) LIKE LOWER(:username))', { username: `%${username}%` })
            .select(['user.id', 'user.username', 'user.roles', 'Tasks'])
            .getMany();
        if (Object.keys(tasks).length === 0) {
            throw new NotFoundException(`The User: "${username}" not found`);
        }
        return tasks;

    }


    async UpdateUser(username: string, userInfromationDto: UpdateInformationDto, user: User): Promise<User[]> {
        if (username != user.username) {
            throw new UnauthorizedException()
        }
        const query = await this.userRepository.createQueryBuilder()

        if (userInfromationDto.firstName != null) {
            query.update(User)
                .set({ firstName: userInfromationDto.firstName }).where({ username }).execute()
        }

        if (userInfromationDto.lastName != null) {
            query.update(User)
                .set({ lastName: userInfromationDto.lastName }).where({ username }).execute()
        }


        if (userInfromationDto.email != null) {
            query.update(User)
                .set({ email: userInfromationDto.email }).where({ username }).execute()
        }

        if (userInfromationDto.email && userInfromationDto.firstName && userInfromationDto.lastName == null) {
            throw new NotAcceptableException('No Entry')
        }

        return this.userRepository.createQueryBuilder('user').where({ username })
            .select(['user.firstName', 'user.lastName', 'user.email']).getMany();

    }
    async DeleteUserByAdmin(username: string) {
        const found = await this.userRepository.createQueryBuilder().where({ username }).getMany();
        if (Object.keys(found).length === 0) {
            throw new NotFoundException(`The User: "${username}" not found`);
        }
        await this.userRepository.createQueryBuilder()
            .update(User).where({ username }).set({ deletedAt: new Date }).execute();

        return 'User has been deleted successfully';
    }


    async RestoreUserByAdmin(username: string) {
        const found = await this.userRepository.createQueryBuilder().where({ username }).getMany();
        if (Object.keys(found).length !== 0) {
            throw new BadRequestException(`The User: "${username}" is not deleted`)
        }
        await this.userRepository.createQueryBuilder()
            .update(User).where({ username }).set({ deletedAt: null }).execute();

            const check = await this.userRepository.createQueryBuilder().where({ username }).getMany();
            if (Object.keys(check).length == 0) {
                throw new BadRequestException(`The User: "${username}" Not found`)
            }
        return 'The User has been restored successfully';
    }

    async getTasksOfAllUsers():Promise<User[]> {
        const tasks = await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect("user.tasks", "Tasks")
        .select(['user.username', 'user.roles', 'Tasks.id','Tasks.title','Tasks.description','Tasks.status'])
        .getMany();
        return tasks;
    }
}

