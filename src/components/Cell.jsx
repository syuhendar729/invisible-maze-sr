export default function Cell(props) {
    const isActive = props.x === props.activeX && props.y === props.activeY
    const isFinish = props.x === props.finishX && props.y === props.finishY
    const w = props.wall
    const inv = props.isInvisible
    let fill = '-'
    if (isActive && inv) fill = '#'
    else if (isFinish && inv) fill = 'F'

    return (
        <td
            className="cell"
            style={{
                fontSize: '3rem',
                textAlign: 'center',
                verticalAlign: 'middle',
                borderLeft: w.left ? '' : '1px',
                borderRight: w.right ? '' : '1px',
                borderTop: w.top ? '' : '1px',
                borderBottom: w.bottom ? '' : '1px',
                color: isActive && inv ? '#e8cc15' : '#888888',
                // border: '1px solid transparent',
            }}
            onClick={() => console.log(props)}
        >
            {fill}
        </td>
    )
}
