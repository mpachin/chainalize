const lowerCaseFirstLetter = (str) =>
  str[0].toLowerCase() + str.slice(1);

const deepChaining = (
  instances,
  LinkClass,
  linkClassName,
  args,

  circularDependencies = {},
  initializedClasses = {}
) => {
  // Instance already initialized
  if (initializedClasses[linkClassName]) {
    return;
  }

  // No dependencies found
  if (!LinkClass.dependencies) {
    const instanceName = lowerCaseFirstLetter(linkClassName);
    instances[instanceName] = new LinkClass(args);
    initializedClasses[linkClassName] = true;
    return;
  }

  // Initialized dependencies for constructor
  const argsInstances = {};

  // Recursively initialize dependency instances
  for (let depClassName in LinkClass.dependencies) {
    const DepClass = LinkClass.dependencies[depClassName];

    // Circular dependency handling
    if (circularDependencies[depClassName]) {
      const initializationSequence = Object.keys(circularDependencies).join(' > ');

      throw new Error(
        'chainalize: circular dependency found ' +
        `[${linkClassName} - ${depClassName}]; ` +
        `full initialization sequence: ${initializationSequence}`
      );
    }
    circularDependencies[linkClassName] = true;

    deepChaining(
      instances,
      DepClass,
      depClassName,
      args,

      Object.assign(circularDependencies),
      initializedClasses
    );

    const depInstanceName = lowerCaseFirstLetter(depClassName);
    argsInstances[depInstanceName] = instances[depInstanceName];
  }

  initializedClasses[linkClassName] = true;
  const instanceName = lowerCaseFirstLetter(linkClassName);
  instances[instanceName] = new LinkClass(Object.assign({}, args, argsInstances));
};

const chainalize = (classes, args) => {
  const instances = {};

  for (let linkClassName in classes) {
    const LinkClass = classes[linkClassName];

    deepChaining(
      instances,
      LinkClass,
      linkClassName,
      args
    );
  }

  return instances;
};

module.exports = chainalize;