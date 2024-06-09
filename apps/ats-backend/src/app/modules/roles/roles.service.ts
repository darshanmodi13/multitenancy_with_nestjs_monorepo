import { Injectable } from '@nestjs/common';
import { Roles } from './schema/roles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRolesDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { getPermissions } from '@ats-backend/src/app/shared/decorators/permission.decorator';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private _rolesModel: Model<Roles>) {}

  async findAll(tenant_id: string): Promise<Roles[]> {
    return this._rolesModel.find({ tenant_id, isDeleted: false });
  }

  async create(tenant_id: string, body: CreateRolesDto): Promise<Roles> {
    return this._rolesModel.create({ ...body, tenant_id });
  }

  async update(
    tenant_id: string,
    id: string,
    body: UpdateRoleDto
  ): Promise<Roles> {
    return this._rolesModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...body,
        },
      },
      { new: true }
    );
  }

  async delete(id: string): Promise<Roles> {
    return this._rolesModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  }

  async getPermissions(): Promise<string[]> {
    return [...getPermissions()];
  }
}
