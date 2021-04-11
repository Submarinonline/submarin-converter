const settings = require("./settings.json"),
  root = require("app-root-path"),
  addon = require(root + "/submarin-converter-addons/define.json")

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
    throw new Error(`"${key}"がメインモジュールと重複しています。addon/define.jsonを編集して下さい。`)
})

const converter = (function () {
  let temp = {}
  settings.priority.forEach(val => {
    if (Object.keys(mainModule).includes(val))
      temp[val] = mainModule[val]
    else if (Object.keys(addon).includes(val))
      temp[val] = new convertModule(addon[val].type, require(addon[val].module), addon[val].role)
    else
      throw new Error(`"${val}"は存在しません。settings.jsonのpriorityを編集して下さい。`)
  })
  return temp
}())

module.exports = async (IDs = [], text = "", options = []) => {
  if (IDs.length == 0) throw new Error(`IDが入力されていません。`)
  if (text == "") throw new Error(`textが入力されていません。`)
  let tempText = text
  i = 0
  for (ID of IDs) {
    if (!Object.keys(converter).includes(ID))
      throw new Error(`"${ID}"は存在しません。`)
    tempText = await converter[ID].convert(tempText, (options[i] || undefined))
    i++
  }
  return tempText
}