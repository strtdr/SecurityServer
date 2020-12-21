export class KeyGenerator {
  public static GenerateKey(length: number): string {
    return Math.floor(1000 + Math.random() * Math.pow(10, length))
      .toString()
      .substring(0, length);
  }

  public static GeneratePasswordKey(): string {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(
      /[x]/g,
      function(c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
}
