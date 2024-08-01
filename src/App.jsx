import { useEffect, useState } from 'react'
import './App.css'
import initialMazeData from './models/Data'
import Cell from './components/Cell'

function App() {
    const [maze, setMaze] = useState(initialMazeData)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [finish, setFinish] = useState({ x: 2, y: 2 })
    const [isInvisible, setIsInvisible] = useState(false)

    useEffect(() => {
        console.log(`x: ${position.x}, y: ${position.y}`)
    }, [position])

    const hitWall = () => {
        alert('Kamu menabrak tembok, nyawa berkurang 1!')
    }

    const handleMove = (dx, dy, wallCheck) => {
        const { x, y } = position
        const newX = x + dx
        const newY = y + dy

        if (
            newX >= 0 &&
            newX < maze[0].length &&
            newY >= 0 &&
            newY < maze.length &&
            !wallCheck
        ) {
            setPosition({ x: newX, y: newY })
            if (newX === finish.x && newY === finish.y)
                alert('Gacor, lu menang cookkk!!')
        } else {
            hitWall()
        }
    }

    const handleLeft = () =>
        handleMove(-1, 0, maze[position.y][position.x - 1]?.right)
    const handleRight = () =>
        handleMove(1, 0, maze[position.y][position.x]?.right)
    const handleUp = () =>
        handleMove(0, -1, maze[position.y - 1]?.[position.x]?.bottom)
    const handleDown = () =>
        handleMove(0, 1, maze[position.y]?.[position.x]?.bottom)

    const toggleInvisibleMaze = () => {
        setIsInvisible(!isInvisible)
    }

    const renderMaze = () => {
        return maze.map((row, indexY) => (
            <tr key={indexY}>
                {row.map((wall, indexX) => (
                    <Cell
                        key={`${indexY}-${indexX}`}
                        x={indexX}
                        y={indexY}
                        activeX={position.x}
                        activeY={position.y}
                        finishX={finish.x}
                        finishY={finish.y}
                        wall={
                            isInvisible
                                ? {
                                      left: false,
                                      right: false,
                                      top: false,
                                      bottom: false,
                                  }
                                : wall
                        }
                    />
                ))}
            </tr>
        ))
    }

    return (
        <>
            <table className="board">
                <tbody>{renderMaze()}</tbody>
            </table>
            <div className="buttonArrow">
                <button
                    className="arrow-button left"
                    onClick={handleLeft}
                ></button>
                <button className="arrow-button up" onClick={handleUp}></button>
                <button
                    className="arrow-button down"
                    onClick={handleDown}
                ></button>
                <button
                    className="arrow-button right"
                    onClick={handleRight}
                ></button>
            </div>
            <button onClick={toggleInvisibleMaze}>Hilang</button>
        </>
    )
}

export default App
