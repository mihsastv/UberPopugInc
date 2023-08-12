import { Profile, RoleEnum } from '../../model';

export class CreateProfile implements Profile {
  public_id: string;
  login: string;
  role: RoleEnum;
  password: string;
}
