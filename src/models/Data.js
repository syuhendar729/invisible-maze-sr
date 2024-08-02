const wall = { left: true, right: true, top: true, bottom: true }

const generateLabirin = (width, height) => {
    const grid = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => ({ ...wall }))
    )

    const visited = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => false)
    )

    const directions = [
        { x: 0, y: -1, key: 'top', opposite: 'bottom' }, // Up
        { x: 0, y: 1, key: 'bottom', opposite: 'top' }, // Down
        { x: -1, y: 0, key: 'left', opposite: 'right' }, // Left
        { x: 1, y: 0, key: 'right', opposite: 'left' }, // Right
    ]

    const isInBounds = (x, y) => x >= 0 && y >= 0 && x < width && y < height

    const dfs = (x, y) => {
        visited[y][x] = true

        const shuffledDirections = directions.sort(() => Math.random() - 0.5)
        shuffledDirections.forEach(({ x: dx, y: dy, key, opposite }) => {
            const nx = x + dx
            const ny = y + dy

            if (isInBounds(nx, ny) && !visited[ny][nx]) {
                grid[y][x][key] = false
                grid[ny][nx][opposite] = false
                dfs(nx, ny)
            }
        })
    }

    // Generate the maze
    const startX = Math.floor(Math.random() * width)
    const startY = Math.floor(Math.random() * height)
    dfs(startX, startY)

    // Find valid start and finish positions
    const isAccessible = (x, y) => !visited[y][x]
    let start, finish

    do {
        start = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
        }
    } while (isAccessible(start.x, start.y))

    do {
        finish = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
        }
    } while (
        isAccessible(finish.x, finish.y) ||
        (start.x === finish.x && start.y === finish.y)
    )

    return { grid, start, finish }
}

const labirinData = generateLabirin(5, 5)

export default labirinData

// const gen = (n) => {
//     let wall = { left: true, right: true, top: true, bottom: true }
//     switch (n) {
//         case 1:
//             wall.left = false
//             break
//         case 2:
//             wall.right = false
//             break
//         case 3:
//             wall.top = false
//             break
//         case 4:
//             wall.bottom = false
//             break
//         case 5:
//             wall.left = false
//             wall.right = false
//             break
//         case 6:
//             wall.left = false
//             wall.top = false
//             break
//         case 7:
//             wall.left = false
//             wall.bottom = false
//             break
//         case 8:
//             wall.right = false
//             wall.top = false
//             break
//         case 9:
//             wall.right = false
//             wall.bottom = false
//             break
//         case 10:
//             wall.top = false
//             wall.bottom = false
//             break
//     }
//     return wall
// }
//
// const labirinGua = [
//     [gen(4), gen(4)],
//     [gen(8), gen(6)],
// ]

// export default labirinGua

/* const wall = { left: true, right: true, top: true, bottom: true }
const wBlank = { left: false, right: false, top: false, bottom: false }

const cellData = [
	[wall, wall, wall, wall],
	[wall, wall, wall, wall],
	[wall, wall, wall, wall],
	[wall, wall, wall, wall],
]

export default cellData */
