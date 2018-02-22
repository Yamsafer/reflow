module.exports = {
  table_name: "flows_by_job_id",
  fields: {
    job_id: "bigint",
    flow_id: "bigint",
    flow_title: "text",
    combination_id: "bigint",
    combination_successes: "int",
    combination_failures: "int",
    combination_skipped: "int",
    combiantion_total: "int",
    total_number_of_flow_combinations: "int",
  },
  key : [["job_id"], "flow_id", "combination_id"],
  clustering_order: {"flow_id": "desc", "combination_id": "desc"},
}
