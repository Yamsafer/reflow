const accept = function accept({driver}) {

  return function() { driver.execute('mobile: alert', {
    'action': 'accept',
    // 'buttonLabel': 'My Cool Alert Button',
  });
}
}
module.exports = accept
