import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { getManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../../modules';
import { AuthPasswordDto, ErrorType } from '../../main';

@Injectable()
export class ProfileService {
  public async GetMe(id: number): Promise<UserEntity> {
    return getManager().transaction(async entityManager => {
      const user = await entityManager
        .createQueryBuilder(UserEntity, 'user')
        .where('user.id = :id', { id })
        .leftJoin('user.image', 'image')
        .addSelect(['image.id', 'image.url'])
        .getOne();
      if (!user) throw new UnauthorizedException(ErrorType.ProfileNotFound);
      return user;
    });
  }

  public async UpdatePassword(
    body: AuthPasswordDto,
    id: number,
  ): Promise<UserEntity> {
    return getManager().transaction(async entityManager => {
      const user = await getManager()
        .createQueryBuilder(UserEntity, 'user')
        .addSelect('user.password')
        .where('user.id = :id', { id })
        .getOne();

      if (!user) throw new NotFoundException(ErrorType.ProfileNotFound);

      if (body.newPassword !== body.repeatNewPassword)
        throw new BadRequestException(ErrorType.PasswordNotMatch);

      if (!bcrypt.compareSync(body.password, user.password))
        throw new BadRequestException(ErrorType.WrongPassword);

      user.password = body.newPassword;

      return await entityManager.save(user);
    });
  }
}
