import { Profile } from '../../model';

export class DeleteProfile implements Pick<Profile, 'public_id'> {
  public_id: string;
}
