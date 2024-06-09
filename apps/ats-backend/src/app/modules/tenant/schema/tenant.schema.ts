import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '@ats-backend/src/app/shared/entity/base.entity';
import { DATABASE_NAMES } from '@ats-backend/src/app/utils/constants';

@Schema({ collection: DATABASE_NAMES.TENANT, timestamps: true })
export class Tenant extends BaseEntity {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  domain: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
