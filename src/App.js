import web3 from "./web3";
import React from "react";
import { indexerContract } from "./indexer";
import { buildProxy } from "./indexer";
const tokenAbi = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      proxy: null,
      token: null,
      tokenSymbol: null,
      tokenBalance: null,
      createProxyMessage:null,
      availableProxies:[],
      amount: 0,
    };
  }

  async componentDidMount() {
    let proxies=[];
    const accounts = await web3.eth.getAccounts();
    let userLink = await indexerContract.methods.userLink(accounts[0]).call();
    let nextIndex=userLink[0];
    for(let i=0;i<userLink[2];i++){
      let proxy;
      let temp;
      proxy=await indexerContract.methods.accountAddr(nextIndex).call();
      temp=await indexerContract.methods.userList(accounts[0],nextIndex).call();
      nextIndex=temp[1];
      proxies.push(proxy);
    }
    this.setState({
      address: accounts[0],
      proxy: proxies[0],
      availableProxies:proxies
    });
  }

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  async handleDeposit(amount, address, proxy, token) {
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
      token,
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

  async handleWithdraw(amount, address, proxy, token) {
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
      token,
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

  async handleBorrow(amount, address, proxy, token) {
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
      token,
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

  handleUsdt = async (proxy) => {
    const tokenContract = new web3.eth.Contract(
      tokenAbi,
      "0x56705db9f87c8a930ec87da0d458e00a657fccb0"
    );
    const balance = await tokenContract.methods.balanceOf(proxy).call();
    this.setState({
      token: "0x56705db9f87c8a930ec87da0d458e00a657fccb0",
      tokenSymbol: "USDT",
      tokenBalance: balance / 10 ** 18,
    });
  };

  handleUsdc = async (proxy) => {
    const tokenContract = new web3.eth.Contract(
      tokenAbi,
      "0x9FD21bE27A2B059a288229361E2fA632D8D2d074"
    );
    const balance = await tokenContract.methods.balanceOf(proxy).call();
    this.setState({
      token: "0x9FD21bE27A2B059a288229361E2fA632D8D2d074",
      tokenSymbol: "USDC",
      tokenBalance: balance / 10 ** 6,
    });
  };

  handleDai = async (proxy) => {
    const tokenContract = new web3.eth.Contract(
      tokenAbi,
      "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33"
    );
    const balance = await tokenContract.methods.balanceOf(proxy).call();
    this.setState({
      token: "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33",
      tokenSymbol: "DAI",
      tokenBalance: balance / 10 ** 18,
    });
  };

  handleCreateProxy=async(address)=>{
    this.setState({
      createProxyMessage:"creating proxy..."
    })
    const receipt=await buildProxy.methods.build(address).send({from:address});
    this.setState({
      createProxyMessage:"Proxy created! please refresh the page!"
    });
    
  }

  handleSelectProxy=(proxyAddress)=>{
    this.setState({
      proxy:proxyAddress
    })
  }

  displayAvailableProxies=()=>{
    let rows=[];
    for(let proxy of this.state.availableProxies){
      rows.push(<div><span>{proxy}</span><button onClick={()=>{this.handleSelectProxy(proxy)}}>Select This!</button></div>)
    }
    return rows;
  }

  render() {
    return (
      <div className="App">
        <p>Your Addresss : {this.state.address}</p>
        {this.state.proxy == "0x0000000000000000000000000000000000000000" ? (
          <div>
            <b>
              You dont have a proxy please create one using the button below!
            </b>
            <br/>
            <br/>
            <button onClick={()=>{this.handleCreateProxy(this.state.address)}}>{this.state.createProxyMessage==null?"Create A Proxy!":this.state.createProxyMessage}</button>
          </div>
        ) : (
          <div>
            <p>Available proxy addresses:
              {this.displayAvailableProxies()}
            </p>
            <p>Selected Proxy Address: {this.state.proxy}</p>
            <p>Selected Token Address: {this.state.tokenSymbol}</p>
            <p>Proxy Balance Of Selected Token:{this.state.tokenBalance}</p>
            <h3>1. Aave V2 </h3>
            <p>Select Token</p>
            <button
              onClick={() => {
                this.handleUsdt(this.state.proxy);
              }}
            >
              USDT
            </button>
            <button
              onClick={() => {
                this.handleUsdc(this.state.proxy);
              }}
            >
              USDC
            </button>
            <button
              onClick={() => {
                this.handleDai(this.state.proxy);
              }}
            >
              DAI
            </button>
            <p>amount</p>
            <input name="amount" onChange={this.handleAmountChange} />
            <button
              onClick={() =>
                this.handleDeposit(
                  this.state.amount,
                  this.state.address,
                  this.state.proxy,
                  this.state.token
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
                  this.state.proxy,
                  this.state.token
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
                  this.state.proxy,
                  this.state.token
                )
              }
            >
              Borrow
            </button>
            <p>{this.state.message ? this.state.message : "💃💃💃"}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
