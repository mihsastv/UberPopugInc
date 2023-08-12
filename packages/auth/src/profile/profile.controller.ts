import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfile } from './dto/create-profile.dto';
import { DeleteProfile } from './dto/delete-profile.dto';
import { UpdateProfile } from './dto/update-profile.dto';
import { Profile } from '../model';

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
  getProfiles(): Promise<Profile[]> {
    return this.profileService.get();
  }
}
