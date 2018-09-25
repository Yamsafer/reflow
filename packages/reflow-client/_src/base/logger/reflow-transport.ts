import * as winston from 'winston';

export
interface ReflowTransportOptions extends winston.LoggerOptions {
  name?: string
  onLog(msg: string, cb: any): void
}

export
class ReflowTransport extends winston.transports.Http {
  constructor(options: ReflowTransportOptions) {
    super(options);
  }
  log(info: any, next: () => void) {
    if(super.log) {
      return super.log(info, next);
    }
  }
}
