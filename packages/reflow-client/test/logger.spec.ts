/// <reference path="typings/globals.d.ts" />
import * as logger from '../src/commands/logger'

describe("Logger", function() {
  it("exposes logger and logger methods", function() {
    expect(logger.logger).to.not.be.an("undefined")
  });
  it("exposes logger methods", function() {
    expect(logger).to.have.keys(['logger', 'trace', 'debug', 'info', 'warn', 'error']);
  })
})
