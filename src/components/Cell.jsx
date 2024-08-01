export default function Cell(props) {
    const isActive = props.x === props.activeX && props.y === props.activeY
    const isFinish = props.x === props.finishX && props.y === props.finishY
    const w = props.wall

    return (
        <td
            className="cell"
            style={{
                fontSize: isActive ? '3rem' : '3rem',
                color: isActive ? '#e8cc15' : '#888888',
                textAlign: 'center',
                verticalAlign: 'middle',
                borderLeft: w.left ? '' : '1px',
                borderRight: w.right ? '' : '1px',
                borderTop: w.top ? '' : '1px',
                borderBottom: w.bottom ? '' : '1px',
                // border: '1px solid transparent',
            }}
            onClick={() => console.log(props)}
        >
            {isActive ? '#' : isFinish ? 'F' : '-'}
        </td>
    )
}
