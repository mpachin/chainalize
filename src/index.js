const lowerCaseFirstLetter = (str) =>
  str[0].toLowerCase() + str.slice(1);

const deepChaining = (
  instances,
  LinkClass,
  linkClassName,
  globalArguments,
  inputArguments,

  circularDependencies = {},
  initializedClasses = {},
) => {
  // Instance already initialized
  if (initializedClasses[linkClassName]) {
    return;
  }

  const linkClassArguments = Object.assign(
    inputArguments[linkClassName]
      ? {
        [`${lowerCaseFirstLetter(linkClassName)}LocalArg`]: inputArguments[linkClassName],
      }
      : {},
    globalArguments,
  );

  // No dependencies found
  if (!LinkClass.dependencies) {
    const instanceName = lowerCaseFirstLetter(linkClassName);
    instances[instanceName] = new LinkClass(linkClassArguments);
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
      const initializationSequence = Object.keys(circularDependencies)
        .concat([linkClassName, depClassName])
        .join(' > ');

      throw new Error(
        'chainalize: circular dependency found ' +
        `[${depClassName} - ${linkClassName}]; ` +
        `full initialization sequence: ${initializationSequence}`
      );
    }
    circularDependencies[linkClassName] = true;

    deepChaining(
      instances,
      DepClass,
      depClassName,
      globalArguments,
      inputArguments,

      Object.assign(circularDependencies),
      initializedClasses,
    );

    const depInstanceName = lowerCaseFirstLetter(depClassName);
    argsInstances[depInstanceName] = instances[depInstanceName];
  }

  initializedClasses[linkClassName] = true;
  const instanceName = lowerCaseFirstLetter(linkClassName);
  instances[instanceName] = new LinkClass(Object.assign({}, linkClassArguments, argsInstances));
};

const chainalize = (classes, inputArguments = {}) => {
  const instances = {};
  const globalArguments = {};

  for (let argumentName in inputArguments) {
    if (!classes[argumentName]) {
      globalArguments[argumentName] = inputArguments[argumentName];
    }
  }

  for (let linkClassName in classes) {
    const LinkClass = classes[linkClassName];

    deepChaining(
      instances,
      LinkClass,
      linkClassName,
      globalArguments,
      inputArguments,
    );
  }

  return instances;
};

module.exports = chainalize;
