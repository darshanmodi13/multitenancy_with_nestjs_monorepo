import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant } from './schema/tenant.schema';
import { Model } from 'mongoose';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(@InjectModel(Tenant.name) private _tenantModel: Model<Tenant>) {}

  async create(body: CreateTenantDto): Promise<Tenant> {
    return this._tenantModel.create(body);
  }

  async findAll(): Promise<Tenant[]> {
    return this._tenantModel.find();
  }

  async findById(id: string): Promise<Tenant | null> {
    return this._tenantModel.findById(id);
  }

  async update(id: string, body: UpdateTenantDto): Promise<Tenant> {
    return this._tenantModel.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );
  }

  async delete(id: string): Promise<Tenant> {
    return this._tenantModel.findByIdAndDelete(id);
  }

  async findTenantByDomain(domain: string): Promise<Tenant | null> {
    return this._tenantModel.findOne({ domain });
  }
}
