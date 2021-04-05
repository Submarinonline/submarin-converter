const settings = require("./settings.json"),
  addon = require("./addon/define.json")

class convertModule {
  constructor(type, Module) {
    this.type = type
    this.convert = Module
  }
}

const mainModule = {
  "cjp": new convertModule("text", require("cjp").generate),
  "nml": new convertModule("text", require("nomlish").translate),
  "mhr": new convertModule("text", require("genhera").generate),
}

Object.keys(addon).forEach(key => {
  if (Object.keys(mainModule).includes(key))
    throw new Error(`The converter "${key}" is duplicated in mainModule and addon.`)
})

const converter = (function () {
  let temp = {}
  settings.priority.forEach(val => {
    if (Object.keys(mainModule).includes(val)) temp[val] = mainModule[val]
    if (Object.keys(addon).includes(val)) temp[val] = new convertModule(addon[val].type, require(addon[val].module), addon[val].role)
  })
  return temp
}())

module.exports = async (ID = "", text = "", option = {}) => {
  if (ID == "") throw new Error(`ID is empty.`)
  if (text == "") throw new Error(`Text is empty.`)
  if (!Object.keys(converter).includes(ID))
    throw new Error(`The converter "${ID}" does not exist.`)
  return await converter[ID].convert(text, option)
}