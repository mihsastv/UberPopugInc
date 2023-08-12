import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfile } from './dto/create-profile.dto';
import { DeleteProfile } from './dto/delete-profile.dto';
import { UpdateProfile } from './dto/update-profile.dto';
import { Profile } from '../model';
import { User } from '../common/user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  createProfile(request: CreateProfile): Promise<boolean> {
    return this.profileService.create(request);
  }

  @Delete()
  deleteProfile(request: DeleteProfile): Promise<boolean> {
    return this.profileService.delete(request);
  }

  @Put()
  updateProfile(request: UpdateProfile): Promise<boolean> {
    return this.profileService.update(request);
  }

  @Get()
  getProfiles(@User() user): Promise<Profile[]> {
    return this.profileService.get();
  }
}
