import React, { useState } from "react";
import { Router, Route } from "react-router-dom";
//import { customHistory } from './stores'
import ThemeContext from "./components/ThemeContext";


import NavBar from "./components/NavBar";
import StockPicker from "./components/StockPicker";
import MagicEightBall from "./components/MagicEightBall";
import GameOfChance from "./components/GameOfChance";
import WinOrLose from "./components/WinOrLose";
import Footer from "./components/Footer";


function App() {
  let [moneyOnHand, setMoneyOnHand] = useState(100);
  const [stockValue, setStockValue] = useState(0);
  const [bet, setBet] = useState({});
  const theme = useState("red");

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <NavBar />
        <StockPicker
          moneyOnHand={moneyOnHand}
          setMoneyOnHand={setMoneyOnHand}
          stockValue={stockValue}
          setStockValue={setStockValue}
          bet={bet}
          setBet={setBet}
        />
        {/* <WinOrLose
          moneyOnHand={moneyOnHand}
          bet={bet}
        /> */}
        <div className="gameWindow">
          <div className="magicEightballWindow">
            <MagicEightBall />
          </div>
          <div className="gameOfChanceWindow">
            <GameOfChance />
          </div>
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
