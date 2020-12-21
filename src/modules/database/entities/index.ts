import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

export * from './user.entity';
export * from './role.entity';

export const APP_ENTITIES = [UserEntity, RoleEntity];
