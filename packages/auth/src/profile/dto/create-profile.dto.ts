import { Role } from '@uber-popug/profile.contract';
import { Profile } from '../../model';

export class CreateProfile implements Profile {
  publicId!: string;
  login!: string;
  role!: Role;
  password!: string;
}
