const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }),
  convert = require("./index")

readline.question('ID,text,(option):', async (answer) => {
  let result = await convert(answer.split(",")[0], answer.split(",")[1], answer.split(",")[2])
  console.log(result)
  readline.close();
});