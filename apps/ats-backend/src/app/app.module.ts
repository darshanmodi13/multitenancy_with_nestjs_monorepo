import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { ConfigurationModule } from '@ats-backend/src/app/shared/configuration/configuration.module';
import { DatabaseModule } from '@ats-backend/src/app/shared/database/database.module';
import { TenantMiddleware } from './shared/middleware/tenant.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigurationModule,
    DatabaseModule,
    ModulesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).exclude('tenant').forRoutes('*');
  }
}
