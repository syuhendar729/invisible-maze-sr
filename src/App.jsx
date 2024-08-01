import { useEffect, useState } from 'react'
import './App.css'
import mazeData from './models/Data'
import Cell from './components/Cell'

function App() {
    const [maze, setMaze] = useState(mazeData)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    let table = []

    maze.forEach((value, indexY) => {
        let rowCell = []
        value.forEach((wall, indexX) => {
            rowCell.push(
                <Cell
                    x={indexX}
                    y={indexY}
                    activeX={x}
                    activeY={y}
                    key={`${indexY}-${indexX}`}
                    wall={wall}
                />
            )
        })
        table.push(<tr key={indexY}>{rowCell}</tr>)
    })

    useEffect(() => {
        console.log(`x: ${x}, y: ${y}`)
    }, [x, y])

    // Function if hit the wall
    const hitWall = () => {
        alert('Kamu menabrak tembok, nyawa berkurang 1!')
    }

    // Handler untuk arah kiri
    const handleLeft = () => {
        if (x > 0 && !mazeData[y][x - 1].right) {
            setX((prev) => prev - 1)
        } else hitWall()
    }

    // Handler untuk arah kanan
    const handleRight = () => {
        if (x < mazeData[0].length - 1 && !mazeData[y][x].right) {
            setX((prev) => prev + 1)
        } else hitWall()
    }

    // Handler untuk arah atas
    const handleUp = () => {
        if (y > 0 && !mazeData[y - 1][x].bottom) {
            setY((prev) => prev - 1)
        } else hitWall()
    }

    // Handler untuk arah bawah
    const handleDown = () => {
        if (y < mazeData.length - 1 && !mazeData[y][x].bottom) {
            setY((prev) => prev + 1)
        } else hitWall()
    }

    // Create maze invisible
    const invisibleMaze = () => {
        const newMaze = maze.map((row) => {
            return row.map(() => ({
                left: false,
                right: false,
                top: false,
                bottom: false,
            }))
        })
        setMaze(newMaze)
    }

    return (
        <>
            <table className="board">
                <tbody>{table}</tbody>
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
            <button onClick={invisibleMaze}>Hilang</button>
        </>
    )
}

export default App
