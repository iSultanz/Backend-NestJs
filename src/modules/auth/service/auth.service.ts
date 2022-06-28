import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity'; 
import * as bcrypt from 'bcrypt'
import { AuthSignIn } from '../dto/auth-singIn.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { username, password, roles } = authCredentialDto;

        //hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            roles,
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
        .select(['user.id','user.username','user.roles']).getMany()
    }




}

