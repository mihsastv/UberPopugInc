import { Profile } from '../../model';

export class DeleteProfile implements Pick<Profile, 'publicId'> {
  publicId!: string;
}
