import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DATABASE_NAMES, EROLES } from '@ats-backend/src/app/utils/constants';
import { BaseTenantEntity } from '@ats-backend/src/app/shared/entity/base-tenant.entity';

@Schema({ collection: DATABASE_NAMES.ROLES, timestamps: true })
export class Roles extends BaseTenantEntity {
  @Prop({ type: String, required: true, unique: true, enum: EROLES })
  role: string;

  @Prop({ type: [String] })
  permissions: string[];
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
