import { useEffect } from 'react'
import './gamePage.css'
import { createMoneyElement } from './helpers/createMoneyElement'
import { getPixelsFromViewport } from './helpers/getPixelsFromViewport'

export const GamePage = () => {
    useEffect(() => {
        const gameElement = document.querySelector(".game_page") as HTMLDivElement
        const elementSizeViewport = 3
        const elementPixelSize = getPixelsFromViewport(elementSizeViewport)  
        const elementSpawnRate = 500  
        const elementFallingSpeed = 8

        setInterval(() => {
            createMoneyElement(gameElement, elementSizeViewport, elementPixelSize, elementFallingSpeed)
        }, elementSpawnRate)
    }, [])


    return(
        <div className="game_page">

        </div>
    )
} 

