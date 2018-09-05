const parseActions = (actionPath, client) => {
  const customActions = praseDir(actionPath, {
    visit: action => action(client),
  });

  return customActions;
}

export
async function createActions(client, actionsPaths: string[]): Promise<any> {
  const actionSingleton = {};
  // const clientWithActions =
  const actions = actionsPaths
    .map(actionsPath => parseActions(actionsPath, actionSingleton));

  return Object.assign(actionSingleton, ...actions );

}
