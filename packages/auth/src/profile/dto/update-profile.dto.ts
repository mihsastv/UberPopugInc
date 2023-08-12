import { RoleEnum } from '../../model';

export class UpdateProfile {
  public_id: string;
  updateProfile: {
    password: string;
    login: string;
    role: RoleEnum;
  };
}
