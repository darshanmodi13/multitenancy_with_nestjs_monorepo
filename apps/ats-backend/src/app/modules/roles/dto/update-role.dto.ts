import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRolesDto) {}
