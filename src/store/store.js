import { createStore } from 'redux';
import { SET_VALUE, SELECT_CELL, SOLVE_PUZZLE, CLEAR_PUZZLES, RANDOMIZE_BOARD } from '../actions/sudokuActions';
import { isValidValue, isCellValid, getPeers, solve } from './solverHelper'

export let initalState = {
    input: [
        [8, 5, 6, '', 1, 4, 7, 3, ''],
        ['', 9, '', '', '', '', '', '', ''],
        [2, 4, '', '', '', '', 1, 6, ''],
        ['', 6, 2, '', 5, 9, 3, '', ''],
        ['', 3, 1, 8, '', 2, 4, 5, ''],
        ['', '', 5, 3, 4, '', 9, 2, ''],
        ['', 2, 4, '', '', '', '', 7, 3],
        ['', '', '', '', '', '', '', 1, ''],
        ['', 1, 8, 6, 3, '', 2, 9, 4],
    ],
    highlight: [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
    ],
    output: [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
    ],
}

export function solver(state = initalState, action) {
    switch (action.type) {
        case SET_VALUE: {
            const { x, y } = action.payload
            const newValue = action.payload.value ? action.payload.value : ''
            let nextState = {
                input: [
                    [...state.input[0]],
                    [...state.input[1]],
                    [...state.input[2]],
                    [...state.input[3]],
                    [...state.input[4]],
                    [...state.input[5]],
                    [...state.input[6]],
                    [...state.input[7]],
                    [...state.input[8]],
                ],
                output: [
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                ],
                highlight: [...state.highlight],
            }
            nextState.input[x][y] = newValue
            if (isValidValue(newValue) && isCellValid(x, y, nextState.input)) {
                return {
                    ...nextState
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case SELECT_CELL: {
            let nextSelectedState = {
                input: [...state.input],
                output: [...state.output],
                highlight: [
                    [...initalState.highlight[0]],
                    [...initalState.highlight[1]],
                    [...initalState.highlight[2]],
                    [...initalState.highlight[3]],
                    [...initalState.highlight[4]],
                    [...initalState.highlight[5]],
                    [...initalState.highlight[6]],
                    [...initalState.highlight[7]],
                    [...initalState.highlight[8]],
                ],
            }
            nextSelectedState.highlight[action.payload.x][action.payload.y] = true
            const peers = getPeers(action.payload.x, action.payload.y)
            for (const peer of peers) {
                nextSelectedState.highlight[peer.x][peer.y] = true
            }
            return nextSelectedState
        }
        case SOLVE_PUZZLE: {
            const output = solve(state.input)
            const solvedState = {
                input: [...state.input],
                output,
                highlight: [...state.highlight]
            }
            return solvedState
        }
        case CLEAR_PUZZLES: {
            const clearedState = {
                input: [
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                ],
                output: [
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                ],
                highlight: [...initalState.highlight]
            }
            return clearedState
        }
        case RANDOMIZE_BOARD: {
            var inp = [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '']
            ];
            for(var i = 0; i < 60; i++) {
                var temp = inp;
                var x = Math.floor(Math.random() * 9);
                var y = Math.floor(Math.random() * 9);
                inp[x][y] = (Math.floor(Math.random() * 9)+1);
                if(!isCellValid(x,y,inp)) {
                    inp[x][y] = '';
                }
            }

            const randomizedState = {
                input: inp,
                output: [
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                ],
                highlight: [...initalState.highlight]
            }
            return randomizedState
        }
        default:
            return state
    }
}  

export default createStore(solver)
