# submarin-converter
submarin-convert-bot
に使われていた変換エンジンをnpmモジュールとして動くようにしたもの。

バージョン4以降の
submarin-convert-bot
の変換エンジンはこれを使用します。

## Requirement
* [Node.js](https://github.com/nodejs/node)
* [yarn](https://yarnpkg.com)

## Node Dependencies
* [cjp](https://www.npmjs.com/package/cjp)
* [genhera](https://www.npmjs.com/package/genhera)
* [nomlish](https://www.npmjs.com/package/nomlish)

## Installation
```
yarn add submarin-converter
```

## Usage
```
const convert = require("submarin-converter");

result = convert(["cjp"],"この日本語は怪しくなります。");
console.log(result) //こゐ日本语は怪レㄑなゑ。

result2 = convert(["cjp","mhr"],"この日本語は怪しくなった後メンヘラ風になります。");
console.log(result2) //こゐ日本语ゎ怪ﾚㄑなっだ后〆ｿﾍぅ风になゑ。。。
```

## Format
```
convert(IDs: ["cmd1","cmd2","cmd3"…], text: String, options: [cmd1option,cmd2option,cmd3option…], ignoreType: String)
```

## Addon
プロジェクトのルートディレクトリに`/submarin-converter`が存在しない場合、`/submarin-converter`とその内容が自動生成されます。

`/submarin-converter/addons`にNodeモジュールファイルを入れ`define.json`を編集
`/submarin-converter/settings.json`で変換の優先順位を設定することで簡単に変換エンジンを追加することが出来ます。

### define.jsonの形式
```
"コマンドの名前(半角3文字推奨)": {
    "type": "変換先(文字:text,画像:imageなど)",
    "module": "モジュールのファイル名"
  }
```
### settings.jsonの形式
```
{
  "priority": [
    "nml",
    "cjp",
    "mhr",
    "gsc"
  ]
}

変換の優先度が昇順で並んでいます
```

## Author
* [hakunagi](https://github.com/hakunagi)

## Licence
[MIT](https://github.com/Submarinonline/submarin-converter/blob/main/LICENSE)