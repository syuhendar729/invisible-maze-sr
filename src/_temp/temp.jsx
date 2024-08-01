for (let i = 0; i < cellData.length; i++) {
    let rowCell = []
    for (let j = 0; j < cellData[i].length; j++) {
        rowCell.push(
            <Cell
                x={j}
                y={i}
                activeX={x}
                activeY={y}
                key={`${i}-${j}`}
                wall={cellData[i][j]}
            />
        )
    }
    table.push(<tr key={i}>{rowCell}</tr>)
}
