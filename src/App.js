import web3 from "./web3";
import React from "react";
import { indexerContract } from "./indexer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      proxy: null,
      amount: 0,
    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    let indexCall = await indexerContract.methods.userLink(accounts[0]).call();
    let proxy = await indexerContract.methods.accountAddr(indexCall[0]).call();
    this.setState({
      address: accounts[0],
      proxy: proxy,
    });
  }

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  async handleDeposit(amount, address, proxy) {
    const abi = [
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amt", type: "uint256" },
          { internalType: "uint256", name: "getId", type: "uint256" },
          { internalType: "uint256", name: "setId", type: "uint256" },
        ],
        name: "deposit",
        outputs: [
          { internalType: "string", name: "_eventName", type: "string" },
          { internalType: "bytes", name: "_eventParam", type: "bytes" },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string[]",
            name: "_targetNames",
            type: "string[]",
          },
          {
            internalType: "bytes[]",
            name: "_datas",
            type: "bytes[]",
          },
          {
            internalType: "address",
            name: "_origin",
            type: "address",
          },
        ],
        name: "cast",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
    ];

    amount = amount * 10 ** 18;

    const spellData = web3.eth.abi.encodeFunctionCall(abi[0], [
      "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33",
      amount.toString(),
      "0",
      "0",
    ]);

    const castData = web3.eth.abi.encodeFunctionCall(abi[1], [
      ["AaveV2-v1.2"],
      [spellData],
      address,
    ]);

    const nonce = await web3.eth.getTransactionCount(address, "latest");

    let txn = {
      from: address,
      to: proxy,
      gasLimit: "500000",
      maxPriorityFeePerGas: "250000000",
      maxFeePerGas: "5018653759",
      type: "0x2",
      nonce: nonce.toString(),
      data: castData,
      chainId: 5,
    };
    this.setState({ message: "transaction going through..." });
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [txn],
    });

    this.setState({
      message: `Succesfull Transaction! Transaction Hash :${txHash}!!! Party 😉`,
    });
  }

  async handleWithdraw(amount, address, proxy) {
    const abi = [
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amt", type: "uint256" },
          { internalType: "uint256", name: "getId", type: "uint256" },
          { internalType: "uint256", name: "setId", type: "uint256" },
        ],
        name: "withdraw",
        outputs: [
          { internalType: "string", name: "_eventName", type: "string" },
          { internalType: "bytes", name: "_eventParam", type: "bytes" },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string[]",
            name: "_targetNames",
            type: "string[]",
          },
          {
            internalType: "bytes[]",
            name: "_datas",
            type: "bytes[]",
          },
          {
            internalType: "address",
            name: "_origin",
            type: "address",
          },
        ],
        name: "cast",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
    ];

    amount = amount * 10 ** 18;

    const spellData = web3.eth.abi.encodeFunctionCall(abi[0], [
      "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33",
      amount.toString(),
      "0",
      "0",
    ]);

    const castData = web3.eth.abi.encodeFunctionCall(abi[1], [
      ["AaveV2-v1.2"],
      [spellData],
      address,
    ]);

    const nonce = await web3.eth.getTransactionCount(address, "latest");

    let txn = {
      from: address,
      to: proxy,
      gasLimit: "500000",
      maxPriorityFeePerGas: "250000000",
      maxFeePerGas: "5018653759",
      type: "0x2",
      nonce: nonce.toString(),
      data: castData,
      chainId: 5,
    };
    this.setState({ message: "transaction going through..." });
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [txn],
    });

    this.setState({
      message: `Succesfull Transaction! Transaction Hash :${txHash}!!! Party 😉`,
    });
  }

  async handleBorrow(amount, address, proxy) {
    const abi = [
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amt", type: "uint256" },
          { internalType: "uint256", name: "rateMode", type: "uint256" },
          { internalType: "uint256", name: "getId", type: "uint256" },
          { internalType: "uint256", name: "setId", type: "uint256" },
        ],
        name: "borrow",
        outputs: [
          { internalType: "string", name: "_eventName", type: "string" },
          { internalType: "bytes", name: "_eventParam", type: "bytes" },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string[]",
            name: "_targetNames",
            type: "string[]",
          },
          {
            internalType: "bytes[]",
            name: "_datas",
            type: "bytes[]",
          },
          {
            internalType: "address",
            name: "_origin",
            type: "address",
          },
        ],
        name: "cast",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
    ];

    amount = amount * 10 ** 18;

    const spellData = web3.eth.abi.encodeFunctionCall(abi[0], [
      "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33",
      amount.toString(),
      "2",
      "0",
      "0",
    ]);

    const castData = web3.eth.abi.encodeFunctionCall(abi[1], [
      ["AaveV2-v1.2"],
      [spellData],
      address,
    ]);

    const nonce = await web3.eth.getTransactionCount(address, "latest");

    let txn = {
      from: address,
      to: proxy,
      gasLimit: "500000",
      maxPriorityFeePerGas: "250000000",
      maxFeePerGas: "5018653759",
      type: "0x2",
      nonce: nonce.toString(),
      data: castData,
      chainId: 5,
    };
    this.setState({ message: "transaction going through..." });
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [txn],
    });

    this.setState({
      message: `Succesfull Transaction! Transaction Hash :${txHash} 🤟YEAH BOIEE 😎!!!`,
    });
  }

  render() {
    return (
      <div className="App">
        <p>Your Addresss : {this.state.address}</p>
        <p>Your Proxy Address: {this.state.proxy}</p>
        <h3>1. Aave V2 </h3>
        <p>amount</p>
        <input name="amount" onChange={this.handleAmountChange} />
        <button
          onClick={() =>
            this.handleDeposit(
              this.state.amount,
              this.state.address,
              this.state.proxy
            )
          }
        >
          Deposit
        </button>
        <button
          onClick={() =>
            this.handleWithdraw(
              this.state.amount,
              this.state.address,
              this.state.proxy
            )
          }
        >
          Withdraw
        </button>
        <button
          onClick={() =>
            this.handleBorrow(
              this.state.amount,
              this.state.address,
              this.state.proxy
            )
          }
        >
          Borrow
        </button>
        <p>{this.state.message ? this.state.message : "💃💃💃"}</p>
      </div>
    );
  }
}

export default App;
