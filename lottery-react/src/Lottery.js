import web3 from "./Web3";
const address = "0x760008097AFC2Bc175d2476632F52E9472780BD7";

// const abi = [
//   {
//     constant: true,
//     inputs: [],
//     name: "manager",
//     outputs: [{ name: "", type: "address" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: "pickWinner",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "getPlayers",
//     outputs: [{ name: "", type: "address[]" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: "enter",
//     outputs: [],
//     payable: true,
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [{ name: "", type: "uint256" }],
//     name: "players",
//     outputs: [{ name: "", type: "address" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
// ];

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "chooseWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "noOfPlayers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "playersList",
    outputs: [
      {
        internalType: "address payable[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const lottery = new web3.eth.Contract(abi, address);
