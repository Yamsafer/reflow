module.exports = {
  table_name: "suites_by_combination_id",
  fields: {
    combination_id: "bigint",
    suite_id: "timeuuid",
    title: "text",
    level: "int",
    tests: {
      type: "list",
      typeDef: "<FROZEN <test>>",
    },
  },
  key : [["combination_id"], "suite_id"],
  clustering_order: {"suite_id": "desc"},
}
