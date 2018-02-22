module.exports = {
  table_name: "flows_by_flow_id",
  fields: {
    flow_id: "bigint",
    flow_title: "text",
    combination_id: "bigint",
    combination_successes: "int",
    combination_failures: "int",
    combination_skipped: "int",
    combiantion_total: "int",
    total_number_of_flow_combinations: "int",
  },
  key : [["flow_id"], "combination_id"],
  clustering_order: {"combination_id": "desc"},
}
