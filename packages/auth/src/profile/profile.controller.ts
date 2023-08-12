import { Controller } from '@nestjs/common';
import type {
  CreateProfileRequest,
  CreateProfileResponse,
  DeleteProfileRequest,
  DeleteProfileResponse,
  GetProfileRequest,
  GetProfileResponse,
  ScanProfileGrpcController,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@vm/scan-policy-grpc';
import { ScanProfileGrpcMethods } from '@vm/scan-policy-grpc';

import { ProfileService } from './profile.service';

@Controller()
@ScanProfileGrpcMethods()
export class ProfileController implements ScanProfileGrpcController {
  constructor(private readonly profileService: ProfileService) {}

  createProfile(request: CreateProfileRequest): Promise<CreateProfileResponse> {
    return this.profileService.create(request);
  }

  deleteProfile(request: DeleteProfileRequest): Promise<DeleteProfileResponse> {
    return this.profileService.delete(request);
  }

  updateProfile(request: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    return this.profileService.update(request);
  }

  getProfiles(request: GetProfileRequest): Promise<GetProfileResponse> {
    return this.profileService.get();
  }
}
