
export class VirgilCrypto {
  private foo: string;
  constructor() {
    this.foo = 'bar';
  }

  public importPrivateKey = jest.fn();
}

export class VirgilAccessTokenSigner {
  private virgilCrypto: VirgilCrypto;
  constructor(virgilCrypto: VirgilCrypto) {
    this.virgilCrypto = virgilCrypto;
  }
}

export const initCrypto = jest.fn();
