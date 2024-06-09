import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from './schema/roles.schema';
import { GenericErrorHandler } from '../../utils/error-handling';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService, GenericErrorHandler],
})
export class RolesModule {}
