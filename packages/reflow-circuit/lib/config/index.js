const defaultConfig = {
  // mongoUrl: 3000,
};

module.exports = userConfig => {
  return _.defaults(userConfig, defaultConfig);
}

