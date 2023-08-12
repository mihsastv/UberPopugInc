import { Role } from '@uber-popug/profile.contract';

export class UpdateProfile {
  public_id!: string;
  updateProfile!: {
    password: string;
    login: string;
    role: Role;
  };
}
