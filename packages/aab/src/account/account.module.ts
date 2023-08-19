import { Module } from '@nestjs/common';
import { AccountAgregateService } from './account.aggregate';
import { Account } from '../model';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';
import { AccountService } from './account.service';

@Module({
  exports: [AccountAgregateService],
  providers: [AccountAgregateService, AccountService],
  imports: [UtilsMikroOrmModule.forRoot([Account])],
})
export class AccountModule {}
