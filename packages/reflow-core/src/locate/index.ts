import {
  Strategy,
  strategies,
  SuiteName,
  SuitePath,
} from './strategies'


type StrategyName = string;

export
const getStrategy = (locateStrategy: StrategyName, strategyConfig?: any): Strategy => {
  switch(locateStrategy) {
    case 'mapping': return new strategies.MappingStrategy(strategyConfig);
    case 'regex': return new strategies.RegexStrategy(strategyConfig)
    case 'require': return new strategies.RequireStrategy(strategyConfig)
    default: throw Error(`No Locate Strategy with name ${locateStrategy}`);
  }
}

export
const getLocate = async function(locateStrategy: StrategyName, strategyConfig?: any): Promise<(suiteName: SuiteName) => SuitePath> {
  const strategy = getStrategy(locateStrategy, strategyConfig);
  await strategy.generateMapping();
  return strategy.locate.bind(strategy);
}

