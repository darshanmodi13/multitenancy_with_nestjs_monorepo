import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [TenantModule, RolesModule],
  exports: [TenantModule],
})
export class ModulesModule {}
