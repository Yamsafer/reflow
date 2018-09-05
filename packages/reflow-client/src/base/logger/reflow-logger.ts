import {Transport} from 'winston';

export
const reflowLogger =
client => class ReflowLogger extends Transport {
  name: string
  level: string
  constructor(options) {
    super();
    this.name = 'reflow'
    this.level = options.level || 'warn'
  }
  log(level, msg, meta, callback) {
    client(msg, _.assignIn(meta, { level }))
    callback(null, true)
  }
}
