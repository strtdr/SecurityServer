export enum ErrorType {
  AuthNoActivated = 'AUTH_NO_ACTIVATED',
  AuthActivated = 'AUTH_IS_ACTIVATED',
  AuthInvalidData = 'AUTH_INVALID_DATA',
  AuthBlocked = 'AUTH_USER_BLOCKED',
  AuthActivationTime = 'AUTH_ACTIVATION_TIME',
  AuthTwoFactorCode = 'AUTH_TWO_FA_CODE',
  AuthTwoFactorTime = 'AUTH_TWO_FA_TIME',
  AuthTwoFactorResend = 'AUTH_TWO_FA_RESEND',
  AuthWrongActivationKey = 'AUTH_WRONG_ACTIVATION_KEY',
  Forbidden = 'FORBIDDEN_ACCESS',
  ProfileNotFound = 'PROFILE_NOT_FOUND',
  PasswordNotMatch = 'PASSWORD_NOT_MATCH',
  WrongPassword = 'WRONG_PASSWORD',
  TwoFactorRedirect = 'TWO_FACTOR_REDIRECT',
  EmailSendFailed = 'EMAIL_SEND_FAILED',
  AuthInvalidAccount = 'AUTH_INVALID_ACCOUNT',
  MediaNotFound = 'MEDIA_NOT_FOUND',
  UserRoleNotFound = 'USER_ROLE_NOT_FOUND',
  AuthNoLanguage = 'AUTH_NO_LANGUAGE',
  AuthRestoreTime = 'AUTH_RESTORE_TIME',
  AuthRestoreNoEmail = 'AUTH_RESTORE_NO_EMAIL',
  AuthRestoreExpired = 'AUTH_RESTORE_EXPIRED',
}