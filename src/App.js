import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store/store';
import Sudoku from './components/Sudoku';
import { solvePuzzle, clearPuzzles, randomizeBoard } from './actions/sudokuActions'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="solver">
          <div className="solver-buttons">
              <div className="solver-button">
                <button id="solve" onClick={() => store.dispatch(solvePuzzle())}>
                  Solve
                </button>
                <button id="solve" onClick={() => store.dispatch(randomizeBoard())}>
                  Randomize Board
                </button>
                <button id="clear" onClick={() => store.dispatch(clearPuzzles())}>
                  Clear
                </button>
              </div>
            </div>
          <div className="solver-board-container">
            <div className="solver-board">
              <Sudoku title="Board" type="input" />
            </div>
            <div className="solver-board">
              <Sudoku title="Solution" type="output" />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
