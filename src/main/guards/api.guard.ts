import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class ApiGuard implements CanActivate {
  public canActivate(): boolean {
    return true;
  }
}
