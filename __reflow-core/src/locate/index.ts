import {
  Strategy,
  strategies,
} from './strategies'


type StrategyName = string;

export
const getStrategy = (locateStrategy: StrategyName, strategyConfig?: any): Strategy => {
  switch(locateStrategy) {
    // case 'mapping': return new strategies.MappingStrategy(strategyConfig);
    // case 'regex': return new strategies.RegexStrategy(strategyConfig)
    case 'require': return new strategies.RequireStrategy(strategyConfig)
    default: throw Error(`No Locate Strategy with name ${locateStrategy}`);
  }
}

export
const getLocator = async function(locateStrategy: StrategyName, strategyConfig?: any): Promise<Strategy> {
  const strategy = getStrategy(locateStrategy, strategyConfig);
  await strategy.generateFilePaths();
  await strategy.generateMapping();
  return strategy;
}

