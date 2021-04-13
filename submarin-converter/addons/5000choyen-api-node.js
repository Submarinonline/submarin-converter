const host = {
  origin: "https://gsapi.cyberrex.ml/image"
}

module.exports = async (top = "", option = {}) => {
  let word = [(top || "5000兆円"), "欲しい！"]
  const topSplit = top.split(/\r?\n/g)
  if (topSplit.length >= 2) {
    word[0] = topSplit[0].slice(0, 50)
    word[1] = topSplit[1].slice(0, 50)
  }

  word.forEach((key, index) => {
    word[index] = word[index]
      .replace(/\?/g, "？")
      .replace(/\&/g, "＆")
      .replace(/\#/g, "＃")
      .replace(/\./g, "．")
      .replace(/\,/g, "，")
      .replace(/\(/g, "（")
      .replace(/\)/g, "）")
      .replace(/\{/g, "｛")
      .replace(/\}/g, "｝")
      .replace(/\[/g, "［")
      .replace(/\]/g, "］")
  })
  let optionText = "",
    api = host.origin,
    single = 0
  if (option.rainbow) optionText += "&rainbow=true"
  if (option.hoshii) optionText += "&hoshii=true"
  if (option.singletop ^ option.singlebottom) {
    if (option.singletop) single = 1
    if (option.singlebottom) single = 2
  }

  if (option.originhost) api = host.origin

  if (single == 1) {
    return `${api}?top=${encodeURI(word[0])}${optionText}&single=true`
  } else if (single == 2) {
    if (!top) word[0] = "欲しい！"
    return `${api}?bottom=${encodeURI(word[0])}${optionText}&single=true`
  } else {
    return `${api}?top=${encodeURI(word[0])}&bottom=${encodeURI(word[1])}${optionText}`
  }
}