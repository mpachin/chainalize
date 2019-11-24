const deepChaining = (
  instances,
  ClassLink,
  args,
  _circularDependencies = [ClassLink._chainalize_temp],
) => {
  const linkClassName = ClassLink._chainalize_temp;
  if (instances[linkClassName]) {
    return;
  }

  const constructorArguments = [];
  args[linkClassName].forEach((arg) => {
    const depClassName = arg._chainalize_temp;
    if (!depClassName) {
      constructorArguments.push(arg);
      return;
    }
    const updatedCircularDependencies =
      _circularDependencies.concat([depClassName]);

    if (_circularDependencies.includes(depClassName)) {
      throw new Error(
        'chainalize: circular dependency found ' +
        `[${depClassName} - ${linkClassName} - ${depClassName}]; ` +
        `full initialization sequence: ${updatedCircularDependencies.join(' > ')}`
      );
    }

    deepChaining(
      instances,
      arg,
      args,
      updatedCircularDependencies,
    );

    constructorArguments.push(instances[depClassName]);
  });

  instances[linkClassName] = new ClassLink(...constructorArguments);
};

const chainalize = (initConfig) => {
  const classLinks = [];
  const args = {};
  Object.keys(initConfig).forEach((initClassName) => {
    const [ClassLink, ...initArgs] = initConfig[initClassName];
    ClassLink._chainalize_temp = initClassName;
    classLinks.push(ClassLink);
    args[initClassName] = [...initArgs];
  });

  const instances = {};
  classLinks.forEach((ClassLink) => {
    deepChaining(
      instances,
      ClassLink,
      args,
    );
  });

  classLinks.forEach((ClassLink) => delete ClassLink._chainalize_temp);

  return instances;
};

module.exports = {
  chainalize,
  deepChaining,
};
