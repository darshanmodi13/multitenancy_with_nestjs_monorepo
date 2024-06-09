import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from './schema/tenant.schema';
import { GenericErrorHandler } from '@ats-backend/app/utils/error-handling';
import { TenantMiddleware } from '@ats-backend/app/shared/middleware/tenant.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
  ],
  providers: [TenantService, GenericErrorHandler, TenantMiddleware],
  controllers: [TenantController],
  exports: [TenantService, TenantMiddleware],
})
export class TenantModule {}
