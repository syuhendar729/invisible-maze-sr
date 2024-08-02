import { useEffect, useState } from 'react'
import './App.css'
import initialMazeData from './models/Data'
import Cell from './components/Cell'
import Countdown from './components/Countdown'
import Modal from './components/Modal'

function App() {
    const [maze, setMaze] = useState(initialMazeData.grid)
    const [position, setPosition] = useState(initialMazeData.start)
    const [finish, setFinish] = useState(initialMazeData.finish)
    const [isInvisible, setIsInvisible] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState(
        'Kamu menabrak tembok, nyawa berkurang 1!'
    )

    useEffect(() => {
        console.log(`x: ${position.x}, y: ${position.y}`)
    }, [position])

    const hitWall = () => {
        const audio = new Audio('/bs-hitwall.wav')
        audio.play()
        setShowModal(true)
        setPosition(initialMazeData.start)
    }

    const closeModal = () => {
        setShowModal(false)
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
            if (newX === finish.x && newY === finish.y) {
                const audio = new Audio('/bs-finish.wav')
                audio.play()
                setModalMessage('Gacor lu menang Cok!!')
                setShowModal(true)
            }
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

    const handleFinishCountdown = () => {
        setIsInvisible(true)
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
                        isInvisible={isInvisible}
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
            <Countdown initialTime={5} onFinish={handleFinishCountdown} />
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
            <Modal isOpen={showModal} onClose={closeModal}>
                <h2>{modalMessage}</h2>
                <button onClick={closeModal}>Tutup</button>
            </Modal>
        </>
    )
}

export default App
