const root = require("app-root-path"),
  fs = require("fs-extra");

if (!fs.existsSync(root + "/submarin-converter")) {
  fs.mkdirSync(root + "/submarin-converter")
  fs.copySync(__dirname + "/submarin-converter", root + "/submarin-converter")
  console.log("submarin-converter:/submarin-converterを初期化しました。")
}

const settings = require(root + "/submarin-converter/settings.json"),
  addon = require(root + "/submarin-converter/addons/define.json")

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
      temp[val] = new convertModule(addon[val].type, require(`${root}/submarin-converter/addons/${addon[val].module}`), addon[val].role)
    else
      throw new Error(`"${val}"は存在しません。settings.jsonのpriorityを編集して下さい。`)
  })
  return temp
}())

module.exports = async (IDs = [], text = "", options = [], ignoreType = "") => {
  if (IDs.length == 0) throw new Error(`IDが入力されていません。`)
  if (text == "") throw new Error(`textが入力されていません。`)
  let tempText = text
  let i = 0
  for (ID of IDs) {
    if (!Object.keys(converter).includes(ID))
      throw new Error(`"${ID}"は存在しません。`)
    if (converter[ID].type != ignoreType)
      tempText = await converter[ID].convert(tempText, (options[i] || undefined))
    i++
    if (converter[ID].type == "image") break
  }
  return tempText
}