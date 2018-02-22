module.exports = {
  table_name: "combinations_by_flow_id",
  fields:{
    "flow_id": "bigint",
    "combination_id": "bigint",
    "combination_successes": "int",
    "combination_failures": "int",
    "combination_skipped": "int",
    "combination_total": "int",
    "start_at": "timestamp",
    "end_at": "timestamp",
  },
  key : [["flow_id"], "combination_id"],
  clustering_order: {"combination_id": "desc"},
}
