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
convert(["cmd1","cmd2","cmd3"…],"String",([cmd1option,cmd2option,cmd3option…]))
```

## Addon
submarin-converterを使用するプロジェクトのルートディレクトリにsubmarin-converter-addonsフォルダを配置、その中にNodeモジュールファイルを入れdefine.jsonを編集することで簡単に変換エンジンを追加することが出来ます。

例として[submarin-converter-addons-example](https://github.com/Submarinonline/submarin-converter-addons-example)を用意しています。
### define.jsonの形式
```
"コマンドの名前(半角3文字推奨)": {
    "type": "変換先(文字:text,画像:imageなど)",
    "module": "モジュールのファイル名"
  }
```

## Author
* [hakunagi](https://github.com/hakunagi)

## Licence
[MIT](https://github.com/Submarinonline/submarin-converter/blob/main/LICENSE)