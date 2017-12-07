const checkRequired = function(target, requiredEnvs) {
  if(!requiredEnvs || !requiredEnvs.length) return;

  const missingEnvs = requiredEnvs.filter(requiredEnv => {
    return typeof target[requiredEnv] === 'undefined';
  });

  if(missingEnvs.length) {
    console.error('Missing Required Config Fields:')
    console.error(`[${missingEnvs.join(', ')}].`)
    process.exit(1);
  }
}
module.exports = checkRequired
