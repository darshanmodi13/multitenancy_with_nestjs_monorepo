import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => ({
        uri: configService.get('DB_URL'),
      }),
      inject: [ConfigurationService],
    }),
  ],
})
export class DatabaseModule {}
