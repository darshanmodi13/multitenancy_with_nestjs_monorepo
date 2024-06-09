import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseEntity } from './base.entity';
import { Tenant } from '@ats-backend/app/modules/tenant/schema/tenant.schema';

@Schema()
export class BaseTenantEntity extends BaseEntity {
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: Tenant.name,
    index: true,
  })
  tenant_id: string;
}
