import { SetMetadata, applyDecorators } from '@nestjs/common';
import { PERMISSIONS_KEY } from '@ats-backend/app/utils/constants';
import { isPlainObject } from 'lodash';

export function Permissions(permissions: string[]) {
  return applyDecorators(SetMetadata(PERMISSIONS_KEY, permissions));
}

const permissions: Set<string> = new Set();

export function definePermissions(modulePrefix: string, actions) {
  if (isPlainObject(actions)) {
    Object.entries(actions).forEach(([key, action]) => {
      action[key] = `${modulePrefix}:${action}`;
    });

    Object.values(actions).forEach((action: string) => {
      permissions.add(action);
    });
  } else if (Array.isArray(actions)) {
    actions.forEach((action: string) => {
      permissions.add(`${modulePrefix}:${action}`);
    });
  }
}

export const getPermissions = () => permissions;
