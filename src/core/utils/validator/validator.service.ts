import { MillisecondsIn } from '../../constants';

export class Validator {
  public static DateLessThanMinutes(date: Date, minutes: number): boolean {
    return (
      date &&
      new Date() < new Date(date.getTime() + MillisecondsIn.Min * minutes)
    );
  }
}
