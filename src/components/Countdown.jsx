import React, { useState, useEffect } from 'react'

export default function Countdown({ initialTime, onFinish }) {
    const [timeLeft, setTimeLeft] = useState(initialTime)

    useEffect(() => {
        if (timeLeft === 0) {
            onFinish()
            return
        }

        const intervalId = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timeLeft, onFinish])

    return (
        <div>
            <h1>Waktu mengingat: {timeLeft} detik</h1>
        </div>
    )
}
