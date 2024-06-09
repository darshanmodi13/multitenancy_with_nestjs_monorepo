import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseEntity {
  _id: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}
