import winston from 'winston'
import { reflowLogger } from './reflow-logger'

export
interface Logger {
  log(): void,
  silly(): void,
  info(): void,
  debug(): void,
  verbose(): void,
  warn(): void
}

export
interface LoggerConfigs {
  level: string,
  label: string,
}

export
function createWinstonInstance(config: LoggerConfigs): Logger {
  const defaultConfig = {
    label: "",
    level: "silly",
  }

  const {
    level,
    label,
  } = Object.assign({}, defaultConfig, config);

  const logger = new (winston.Logger)({
    level: level,
    transports: [
      new (winston.transports.Console)({
        label,
        level: level,
        prettyPrint: true,
        colorize: true,
        silent: false,
        formatter: function({timestamp, level, message, meta}) {
          const formattedLevel = winston.config.colorize(level, level.toUpperCase());

          const displayMessage = typeof message !== undefined ? message : '';
          if(meta instanceof Error) {
            return `[${timestamp()} - ${formattedLevel}] ${displayMessage}${(meta)}`;
          }
          return `[${timestamp()} - ${formattedLevel}] ${displayMessage}${(meta && Object.keys(meta).length ? '\n\t'+ JSON.stringify(meta) : '')}`;
        },
        timestamp: function() {
          const now = new Date();
          const options = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
          }
          return now.toLocaleString("en-US", options)
        },
      })
    ]
  })


  logger.transports.console.level = level;
  logger.level = level;

  logger.add(reflowLogger, {
    level: 'silly',
  })

  return logger
}
