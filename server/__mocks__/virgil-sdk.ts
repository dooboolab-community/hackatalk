export class JwtGenerator {
  private foo: string;
  constructor() {
    this.foo = 'bar';
  }

  generateToken = jest.fn().mockImplementation(() => ({
    toString: jest.fn(),
  }));
}
