declare var expect: any;
declare var sinon: any;
declare namespace NodeJS {
  interface Global {
    expect: any
    sinon: any
  }
}
