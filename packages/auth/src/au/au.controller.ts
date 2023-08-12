import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { SignIn } from './dto/sign-in.dto';
import { AuService } from './au.service';
import { Public } from './decorators/public.decorator';
import { User } from '../common/user.decorator';

@Controller('au')
export class AuController {
  @Inject() private authService!: AuService;

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn: SignIn) {
    return this.authService.signIn(signIn);
  }

  @Post('check')
  check(@User() user) {
    return user;
  }
}
