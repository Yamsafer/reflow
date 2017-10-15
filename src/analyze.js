import _ from 'lodash';

const analyze = function(name, combinations) {
  const analysisTree = [];
  const withArrows = ' -> ';
  const analyticsMap = combinations.map(combination =>
    combination
      .map(suite => {
        if(suite.type === "suite") {
          return suite.name;
        }
        if(!_.isArray(suite.suites)) {
          if(suite.suites.name === "NOOP") {
            return `( ${suite.name} )`
          }
          return `(${suite.name}: ${suite.suites.name})`;
        }

        // if(suite.name === "Postpaid Suppliers") {
        //   console.log('suite.name::', suite.name)
        //   console.log('suite!!::', suite.suites)
        // }

        return `(${suite.name}: ${suite.suites.map(suite=> {
          if(suite.type === "suite") return suite.name;

          if(suite.type === "subflow") {
            
            if(!_.isArray(suite.suites)) {
              if(suite.suites.name === "NOOP") {
                return `( ${suite.name} )`
              }
              return `(${suite.name}: ${suite.suites.name})`
            }
            return `(${suite.name}: ${suite.suites.map(suite => suite.name).join(withArrows)})`
          }

          if(_.isArray(suite.suites)) {
            return `(${suite.name}: ${suite.suites.map(suite => suite.name).join(withArrows)})`
          }

          return suite.suites.name
        }).join(withArrows)})`;
      })
      .join(withArrows),
  );
  analysisTree.push(`${name}: (${analyticsMap.length} combinations)`);
  
  analyticsMap.forEach(combination => {
    analysisTree.push(` | ${combination}`);
  });
  return analysisTree
};

export default analyze

