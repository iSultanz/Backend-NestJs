import { InternalServerErrorException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core";
import { CanActivate } from "@nestjs/common/interfaces/features/can-activate.interface";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { Reflector } from "@nestjs/core";
import { Role } from "src/constants/role.enum";  




@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean{
        const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
            context.getHandler(),
            context.getClass(),
        ]);
        if(!requireRoles){
            throw new InternalServerErrorException();
            return true; 
        }
        const { user } = context.switchToHttp().getRequest();

        return requireRoles.some(role => user.roles.includes(role));
    }
}