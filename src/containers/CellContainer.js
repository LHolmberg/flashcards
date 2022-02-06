import { connect } from 'react-redux';
import { setValue, selectCell } from '../actions/sudokuActions.js'
import Cell from '../components/Cell'

const mapStateToProps = (state, ownProps) => {
    let highlighted = false

    if (ownProps.type === 'input' && state['highlight'][ownProps.x][ownProps.y]) {
        highlighted = true
    }
     return {
        value: state[ownProps.type][ownProps.x][ownProps.y],
        highlighted,
        disabled: ownProps.type !== 'input'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setValue: (value) => dispatch(setValue(ownProps.x, ownProps.y, value)),
        selectCell: () => dispatch(selectCell(ownProps.x, ownProps.y)),
    }
}

const CellContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cell)

export default CellContainer