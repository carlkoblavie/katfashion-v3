const changeCase = require('change-case')
const { pluralize } = require('inflection');

module.exports = {
  helpers: {
    modelName,
    modelInstance,
    controllerName: name => controllerName(name),
    tableName
  }
}

function modelName(s) {
  return changeCase.pascalCase(s)
}

function modelInstance(s) {
  return changeCase.camelCase(s)
}

function controllerName(name) {
  console.log(name)
  return pluralize(changeCase.pascalCase(name))
}

function tableName(s) {
  return pluralize(s)
}
