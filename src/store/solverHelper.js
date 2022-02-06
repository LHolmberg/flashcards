const VALID_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function isValidValue(value) {
    if (value === '') {
        return true
    }
    if (isNaN(value)) {
        return false;
    }
    return VALID_VALUES.indexOf(value) !== -1
}

export function isCellValid(x, y, sudoku) {
    const value = sudoku[x][y]
    if (value === '') {
        return true
    }
    const peers = getPeers(x, y)
    for(const peer of peers) {
        if (sudoku[peer.x][peer.y] === value) {
            return false
        }
    }
    return true
}

export function getPeers(x, y) {
    let peers = []

    for(let k = 0; k < 9; k++) {
        if (k !== x) {
            peers.push({
                x: k,
                y,
            })
        }
        if (k !== y) {
            peers.push({
                x,
                y: k,
            })
        }
    }
    const topLeftY = y - y % 3
    const topLeftX = x - x % 3
    for(let i = topLeftX; i < topLeftX + 3; i++) {
        for(let j = topLeftY; j < topLeftY + 3; j++) {
            if (j === y && i === x) {
                continue
            }
            peers.push({
                x: i,
                y: j,
            })
        }
    }
    return peers
}

export function solve(sudoku) {
    let puzzle = [
        [...sudoku[0]],
        [...sudoku[1]],
        [...sudoku[2]],
        [...sudoku[3]],
        [...sudoku[4]],
        [...sudoku[5]],
        [...sudoku[6]],
        [...sudoku[7]],
        [...sudoku[8]],
    ]

    let cycleImprovedAnswer = true
    let remainingCells = []
    while (cycleImprovedAnswer) {
        cycleImprovedAnswer = false
        remainingCells = []

        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                const value = puzzle[x][y]
                if (value) {
                    continue
                }

                const peers = getPeers(x, y)
                let usedValues = []
                for (var peer of peers) {
                    usedValues.push(puzzle[peer.x][peer.y])
                }

                const possibleValues = VALID_VALUES.filter(value => usedValues.indexOf(value) === -1)
                if (possibleValues.length === 1) {
                    puzzle[x][y] = possibleValues[0]
                    cycleImprovedAnswer = true
                } else if (possibleValues.length === 0) {
                    alert('Input is a unsolvable puzzle.')
                    return [
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                    ]
                } else {
                    remainingCells.push({
                        x,
                        y,
                        possibleValues
                    })
                }
            }
        }
    }

    for (let i = 0; i < remainingCells.length; i++) {
        const { x, y, possibleValues } = remainingCells[i]
        let value = puzzle[x][y]
        if (!value) {
            value = possibleValues[0]
        } else {
            const indexOfCurrentValue = possibleValues.indexOf(value)
            if (indexOfCurrentValue >= possibleValues.length - 1) {
                puzzle[x][y] = ''
                i = i - 2
                continue
            }
            value = possibleValues[indexOfCurrentValue + 1]
        }
        puzzle[x][y] = value
        if (!isCellValid(x, y, puzzle)) {
            i = i - 1
            continue
        }
    }
    return puzzle
}
