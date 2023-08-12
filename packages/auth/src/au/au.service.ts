import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { SignIn } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuService {
  @Inject() private profileService: ProfileService;
  @Inject() private jwtService: JwtService;

  async signIn(cred: SignIn): Promise<any> {
    const user = await this.profileService.findOne(cred.login);
    if (user?.password !== cred.password) {
      throw new UnauthorizedException();
    }

    const payload = { ...user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
