async function fetchSessionID() {
  console.info('Fetching session ID');
  this.sessionID = await this.driver.getSessionId();
  return this.sessionID;
}

module.exports = {
  fetch: fetchSessionID
}
