import * as winston from 'winston'
import * as TransportStream from 'winston-transport'

import {
  ReflowTransportOptions,
  ReflowTransport,
} from './reflow-transport';

  // const consoleTransport = new (winston.transports.Console)({
  //   label,
  //   level: level,
  //   prettyPrint: true,
  //   colorize: true,
  //   silent: false,
  //   formatter: function({timestamp, level, message, meta}) {
  //     const formattedLevel = winston.config.colorize(level, level.toUpperCase());

  //     const displayMessage = typeof message !== undefined ? message : '';
  //     if(meta instanceof Error) {
  //       return `[${timestamp()} - ${formattedLevel}] ${displayMessage}${(meta)}`;
  //     }
  //     return `[${timestamp()} - ${formattedLevel}] ${displayMessage}${(meta && Object.keys(meta).length ? '\n\t'+ JSON.stringify(meta) : '')}`;
  //   },
  //   timestamp: function() {
  //     const now = new Date();
  //     const options = {
  //       hour: "numeric",
  //       minute: "numeric",
  //       second: "numeric",
  //       hour12: false,
  //     }
  //     return now.toLocaleString("en-US", options)
  //   },
  // });



export
interface LoggerConfigs {
  level?: string,
  label?: string,
  client: any,
  noConsole: boolean,
  ReflowTransportOptions: ReflowTransportOptions,
  transports?: TransportStream
}

export
function createWinstonInstance(config: LoggerConfigs): winston.Logger {
  const {
    level,
    noConsole,
    ReflowTransportOptions,
    transports,
  } = config;

  const logger = winston.createLogger({
    format: winston.format.json(),
    transports,
    level,
  });

  if(ReflowTransportOptions) {
    const reflowTransport = new ReflowTransport(ReflowTransportOptions);
    logger.add(reflowTransport);
  }

  if(!noConsole) {
    const consoleTransport = new winston.transports.Console({
      format: winston.format.simple()
    });
    logger.add(consoleTransport);
  }

  return logger
}
