import { SetMetadata } from "@nestjs/common/decorators/core";
import { Role } from "src/constants/role.enum"; 


export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

// test