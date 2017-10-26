function createContext(passContext = {}) {
  const context = {
    Buffer,
    clearImmediate,
    clearInterval,
    clearTimeout,
    setImmediate,
    setInterval,
    setTimeout,
    console,
    process,
    ...passContext,
  };
  context.global = context;
  return context;
}

export default createContext