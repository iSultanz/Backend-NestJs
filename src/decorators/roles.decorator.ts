import { SetMetadata } from "@nestjs/common/decorators/core";
import { Role } from "../constants/role.enum"; 


export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

// test