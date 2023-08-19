import { Controller, UseGuards } from '@nestjs/common';
import { AnalyticService } from './analytic.service';
import { AuthGuard } from '../common/auth.guard';
import { User } from '../common/user.decorator';
import { Role } from '@uber-popug/profile.contract';

@UseGuards(AuthGuard)
@Controller('analytic')
export class AnalyticController {
  constructor(private analyticService: AnalyticService) {}

  getTopReport(date: Date, @User() user: any) {
    if (user.role !== Role.ROLE_ADMIN) {
      return;
    }
    return this.analyticService.getTopReport(date);
  }

  getPopugReport(cycleId: string, popugId: string) {
    return this.analyticService.getPopugReport(cycleId, popugId);
  }

  getTopTask(
    cycleId: string,
    dataStart: Date,
    dateEnd: Date,
    @User() user: any,
  ) {
    if (user.role !== Role.ROLE_TOP) {
      return;
    }
    return this.analyticService.getTopTask(cycleId, dataStart, dateEnd);
  }

  getBalanceDay(accountId: string, date: Date, @User() user: any) {
    if (user.profileId !== accountId) {
      return;
    }
    return this.analyticService.getBalanceDay(accountId, date);
  }
}
