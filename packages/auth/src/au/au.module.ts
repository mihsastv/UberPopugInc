import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuController } from './au.controller';
import { AuService } from './au.service';
import { ProfileModule } from '../profile/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './au.const';
import { AuGuard } from './au.guard';

@Global()
@Module({
  controllers: [AuController],
  providers: [
    AuService,
    {
      provide: APP_GUARD,
      useClass: AuGuard,
    },
  ],
  exports: [AuService],
  imports: [
    ProfileModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
})
export class AuModule {}
