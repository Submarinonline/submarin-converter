module.exports = function (top = "", option = []) {
  const url = {
    origin: "https://gsapi.cyberrex.ml/image",
    dyama: "https://api.dyama.net/5k",
    steve: "https://gosenchouen.ml/image"
  }
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

  let optionText = ""

  let api = url.origin

  let single = 0

  option.forEach(val => {
    if (val == "r") optionText += "&rainbow=true"
    if (val == "h") optionText += "&hoshii=true"

    if (val == "t") single = 1
    if (val == "b") single = 2

    if (val == "d") api = url.dyama
    if (val == "s") api = url.steve
    if (val == "o") api = url.origin
  })
  if (option.includes("o")) api = url.origin

  if (single == 1) {
    return `${api}?top=${encodeURI(word[0])}${optionText}&single=true`
  } else if (single == 2) {
    if (!top) word[0] = "欲しい！"
    return `${api}?bottom=${encodeURI(word[0])}${optionText}&single=true`
  } else {
    return `${api}?top=${encodeURI(word[0])}&bottom=${encodeURI(word[1])}${optionText}`
  }
}