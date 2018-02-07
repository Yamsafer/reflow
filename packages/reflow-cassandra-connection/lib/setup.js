const {createClient} = require('./util');
const Promise = require('bluebird');

const schema = [`
  CREATE TABLE IF NOT EXISTS jobs_by_project_id (
    project_id bigint,
    job_id bigint,
    threads int,
    flows int,
    total_number_of_combinations int,
    combiantion_id text,
    github text,
    jenkins text,
    source_branch text,
    target_branch text,
    combination_successes int,
    combination_failures int,
    combination_skipped int,
    combiantion_total int,
    start_at timestamp,
    combination_end_at timestamp,
    combination_start_at timestamp,
    tags set<text>,
    PRIMARY KEY ((project_id), job_id, combiantion_id)
  ) WITH CLUSTERING ORDER BY (job_id DESC, combiantion_id DESC);
  `, `
  CREATE TABLE IF NOT EXISTS flows_by_job_id (
    job_id bigint,
    flow_id bigint,
    flow_title text,
    combiantion_id bigint,
    combination_successes int,
    combination_failures int,
    combination_skipped int,
    combiantion_total int,
    total_number_of_flow_combinations int,
    PRIMARY KEY ((job_id), flow_id, combiantion_id)
  ) WITH CLUSTERING ORDER BY (flow_id DESC, combiantion_id DESC);
  `, `
  CREATE TABLE IF NOT EXISTS combinations_by_flow_id (
    flow_id bigint,
    combiantion_id bigint,
    combination_successes int,
    combination_failures int,
    combination_skipped int,
    combination_total int,
    start_at timestamp,
    end_at timestamp,
    PRIMARY KEY ((flow_id), combiantion_id)
  ) WITH CLUSTERING ORDER BY (combiantion_id DESC);
  `, `
  CREATE TYPE IF NOT EXISTS reflow.error (
    message text,
    htmlMessage text,
    stacktrace text,
    sourceURL text,
    line text,
  );
  `, `
  CREATE TYPE IF NOT EXISTS reflow.metadata (
    meta text,
    message text
  );
  `, `
  CREATE TYPE IF NOT EXISTS reflow.test (
    test_id bigint,
    combination_id bigint,
    title text,
    result text,
    speed text,
    duration float,
    code text,
    err FROZEN <error>,
    metadata list<FROZEN <metadata>>
  );
  `, `
  CREATE TABLE IF NOT EXISTS suites_by_combination_id (
    combination_id bigint,
    suite_id bigint,
    title text,
    level int,
    tests list<FROZEN <test>>,
    PRIMARY KEY ((combination_id), suite_id)
  ) WITH CLUSTERING ORDER BY (suite_id DESC);
`];


async function createKeyspace(config) {
  const client = createClient(null, config)

  const cql = `CREATE KEYSPACE IF NOT EXISTS ${config.keyspace} WITH REPLICATION = ${config.replication}`;
  await client.execute(cql);
  await client.shutdown();
};

async function createTables(config) {
  const client = createClient(config.keyspace, config);
  await Promise.mapSeries(schema, cql => client.execute(cql));
  await client.shutdown();
}

module.exports = async function(config) {
  try {
    console.info('Creating reflow Keyspace')
    await createKeyspace(config);
    console.info('Creating reflow Tables')
    await createTables(config);
    console.info('Complete.')
  } catch(err) {
    console.error('Error in Cassandra Setup:')
    console.error(err);
  }
}


