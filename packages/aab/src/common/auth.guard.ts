import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const check = this.httpService.post(
      'http://127.0.0.0:3001/api/au/check',
      {},
      { headers: request.headers },
    );

    const ttt = await firstValueFrom(check).catch(() => {
      throw new UnauthorizedException();
    });

    request['user'] = ttt.data;

    return true;
  }
}
