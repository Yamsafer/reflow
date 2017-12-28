function Node(name) {
    this.name = name;
    this.children = []; // array
}

Node.prototype.getChild = function (name) {
  return this.children.find(n => {
    if (n.name === name) {
      return true;
    }
  });
};


const createCombinations = function(paths, delimiter=' -> ') {
  return paths.map(path => path.split(delimiter));
}

const createTree = function(config) {
  const tree = new Node(config.rootName);
  const combinations = createCombinations(config.paths, config.delimiter);

  combinations.forEach(function (flow) {
    flow.reduce(function (r, b) {
      var node = r.getChild(b);
      if (!node) {
        node = new Node(b);
        r.children.push(node);
      }
      return node;
    }, tree);
  });
  return tree;
}

export default createTree
