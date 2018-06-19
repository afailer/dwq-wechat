module.exports.mixinModule = function() {
  let tempModel = {}
  let targetModel = {}
  for (let model in arguments) {
    for (let data in arguments[model]) {
      let l = arguments[model]
      if (tempModel[data] == undefined) {
        tempModel[data] = []
      }
      tempModel[data].push(l[data])
    }
  }
  for (let key in tempModel) {
    if (typeof tempModel[key][0] == "object") {
      targetModel[key] = {}
      for (let tempKey in tempModel[key]) {
        Object.assign(targetModel[key], tempModel[key][tempKey])
      }
    } else if (typeof tempModel[key][0] == "function") {
      targetModel[key] = function () {
        for (let func of tempModel[key]) {
          func()
        }
      }
    }else{
      targetModel[key] = tempModel[key][0]
    }
  }
  return targetModel;
}

