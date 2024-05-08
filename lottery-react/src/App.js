import "./App.css";
import React, { useEffect, useState } from "react";
import { lottery } from "./Lottery";
import web3 from "./Web3";

const App = () => {
  const [manager, setManager] = useState("");
  const [winner, setWinner] = useState("");
  const [players, setPlayers] = useState([]);
  const [noOfPlayers, setNoOfPlayers] = useState(0);
  const [message, setMessage] = useState("");
  const [accounts, setAccounts] = useState("");
  const [winnerMessage, setWinnerMessage] = useState("");

  const playersList = async () => {
    console.log("getting players list");
    const player = await lottery.methods.playersList().call();
    console.log(player);

    setPlayers(player);
    setNoOfPlayers(player.length);
  };

  const enterLottery = async (event) => {
    event.preventDefault();
    console.log("Entering the lotter");
    setMessage("You are entering to the lottery, please wait.......");
    const accounts = await web3.eth.getAccounts();
    console.log("accountssss", accounts[0]);
    setAccounts(accounts[0]);
    await lottery.methods.enter().send({ from: accounts[0], value: 100000000 });
    console.log("entered");
    setMessage("You have entered to the lottery");
    playersList();
  };

  const chooseWinner = async (event) => {
    event.preventDefault();
    console.log("selecting winner");
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts[0]);
    setWinnerMessage("Selecting the winner randomly");
    await lottery.methods.chooseWinner().send({ from: accounts[0] });
    const win = await lottery.methods.winner().call();
    console.log("winner has been selected", win);
    setWinner(win);
    setWinnerMessage("Winner chosen 🎉");
    playersList();
  };

  useEffect(() => {
    console.log("insideu se effect");

    const fetchManager = async () => {
      try {
        const managerAddress = await lottery.methods.manager().call();
        console.log(lottery);
        setManager(managerAddress);

        const address = await web3.eth.getAccounts();
        setAccounts(address[0]);
        console.log(manager);
      } catch (error) {
        console.error("Error fetching manager:", error);
      }
    };

    const handleAccountsChanged = async (newAccounts) => {
      console.log("MetaMask accounts changed:", newAccounts);
      setAccounts(newAccounts[0]);
    };
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    fetchManager();
    playersList();
  }, [noOfPlayers]);

  return (
    <div className=" bg-purple-500 h-screen text-white p-10 font-mono ">
      <div className="">
        <h1 className="text-4xl font-bold pt-5 pb-10">DecentralizedLottery</h1>
        {winner && <h3>The winner of the lottery is: {winner}</h3>}
        <p className="absolute right-5 top-16 italic text-purple-700">
          The manager of the contract is {manager}
        </p>
        <p className="absolute right-5 top-20 italic text-purple-700">
          Your wallet address :{accounts}
        </p>
        <div className="flex flex-nowrap mt-10 gap-20 justify-center">
          <div className="playersContainer  basis-1/3  h-fit ">
            <h1 className="text-3xl text-center ">Players List</h1>
            <p className="text-center text-sm italic">
              No of players in lottery: {players.length}
            </p>

            {players.map((player, index) => (
              <p className="bg-purple-500 outline outline-white outline-2 h-8 w-11/12 rounded text-center ml-5 mt-5">
                {" "}
                {player}
              </p>
            ))}
          </div>

          <div className="buttonContainer shadow-lg  basis-1/3  flex flex-col pl-32 justify-center">
            <p>
              Enter to the lottery to win the prize of{" "}
              {players.length * 0.00001} ether.
            </p>
            <button
              className="btn bg-pink-400 rounded px-3 py-2  hover:bg-purple-600 text-white my-5 w-48 h-16 "
              onClick={enterLottery}
            >
              {" "}
              Enter to the lottery
            </button>
            <div> </div>
            <h4>{message}</h4>
            {accounts === manager && (
              <button
                className="btn bg-pink-400 rounded px-3 py-2  hover:bg-purple-600 text-white my-5 w-48 h-16  "
                onClick={chooseWinner}
              >
                Choose Winner
              </button>
            )}
            <h4>{winnerMessage}</h4>
          </div>
        </div>

        {/* <span style={{ fontSize: "0.7rem", fontStyle: "italic" }}>
          Only Manager can select winner
        </span> */}
      </div>
    </div>
  );
};

export default App;
