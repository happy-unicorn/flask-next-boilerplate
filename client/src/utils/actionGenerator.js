function formatType(type) {
    return type.replace(/([a-z])([A-Z])/g, '$1/$2').toLowerCase();
}

export default (reducerName, actionType, customKeys = []) => {
  const prefix = `${reducerName}/${formatType(actionType)}`;
  return customKeys.length !== 0
    ? customKeys.reduce((actions, item) => {
        const slug = item === 'self' ? '' : `/${item}`;
        actions[item] = `${prefix}${slug}`;
        return actions;
      }, {})
    : {
        self: prefix,
        start: `${prefix}/start`,
        success: `${prefix}/success`,
        failure: `${prefix}/failure`,
      };
};
