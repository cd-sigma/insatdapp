import web3 from "./web3";

const abi = [
  {
    inputs: [
      { internalType: "address", name: "_MinimalProxy", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    name: "accountAddr",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "accountID",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "accounts",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint64", name: "_account", type: "uint64" },
    ],
    name: "addAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_account", type: "address" }],
    name: "init",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint64", name: "_account", type: "uint64" },
    ],
    name: "removeAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userLink",
    outputs: [
      { internalType: "uint64", name: "first", type: "uint64" },
      { internalType: "uint64", name: "last", type: "uint64" },
      { internalType: "uint64", name: "count", type: "uint64" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint64", name: "", type: "uint64" },
    ],
    name: "userList",
    outputs: [
      { internalType: "uint64", name: "prev", type: "uint64" },
      { internalType: "uint64", name: "next", type: "uint64" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const indexerAddress = "0x5627789041bA487617Eef286657E0343E754081E";

const indexerContract = new web3.eth.Contract(abi, indexerAddress);

const buildAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "build",
    outputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
    ],
    name: "setCloneContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_indexContract",
        type: "address",
      },
    ],
    name: "setindexContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
let contractAddress = "0x151c433814e0ED1C4130f6aAD41271805d273Cbe";
let buildProxy = new web3.eth.Contract(buildAbi, contractAddress);

export { indexerContract, buildProxy };
