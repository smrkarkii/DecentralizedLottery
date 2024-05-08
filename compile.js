const path = require("path");
const fs = require("fs");
const solc = require("solc");

const LotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(LotteryPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Lottery.sol"
].Lottery;

const json = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Lottery.sol"
].Lottery;
console.log(json.abi);

// console.log(
//   JSON.parse(solc.compile(JSON.stringify(input))).contracts["Lottery.sol"]
//     .Lottery
// );

// console.log("abi", abi);
