import { RoleType } from '../enums';

export interface IUserJwt {
  id: number;
  roles: RoleType[];
  activated: boolean;
  email: string;
}
