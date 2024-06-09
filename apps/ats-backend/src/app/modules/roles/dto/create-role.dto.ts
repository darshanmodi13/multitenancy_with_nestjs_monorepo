import { Injectable } from '@nestjs/common';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getPermissions } from '@ats-backend/src/app/shared/decorators/permission.decorator';
import { EROLES } from '@ats-backend/src/app/utils/constants';

@ValidatorConstraint({ name: 'PermissionsValidator', async: false })
@Injectable()
export class PermissionValidator implements ValidatorConstraintInterface {
  validate(value: string[]): boolean | Promise<boolean> {
    const permissions = getPermissions();

    for (let i = 0; i < value.length; i++) {
      if (!permissions.has(value[i])) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(): string {
    return `Permissions is not defined`;
  }
}

export class CreateRolesDto {
  @IsEnum(EROLES)
  @IsNotEmpty()
  role: string;

  @IsArray()
  @Validate(PermissionValidator)
  permissions: string[];
}
