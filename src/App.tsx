import { useState, useEffect } from 'react'
import './App.css'
import { motion } from 'framer-motion'
import { MCard } from './components'

export const drumTypes = [
  {
    type: 'Kick',
    sound: './sounds/kick.mp3',
  },
  {
    type: 'Snare',
    sound: './sounds/snare.mp3',
  },
  {
    type: 'Hi-hat',
    sound: './sounds/hihat.mp3',
  },
  {
    type: 'Tom',
    sound: './sounds/tom.mp3',
  },
  {
    type: 'Cymbal',
    sound: './sounds/cymbal.mp3',
  },
  {
    type: 'CowBell',
    sound: './sounds/cowbell.mp3',
  },
]

export interface SelectedBitModel {
  rowIndex: number
  collumnIndex: number
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0) // Состояние для хранения текущего индекса элемента
  const rowsCount = 6
  const cardsPerRow = 16
  const [selectedBits, setSelectedBits] = useState<SelectedBitModel[]>([])
  const cardIndexes = Array.from({ length: cardsPerRow }, (_, index) => index)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (cardsPerRow * rowsCount)) // Переключение на следующий элемент
    }, 150) // Задержка в 1 секунду

    return () => clearInterval(intervalId) // Очистка интервала при размонтировании компонента
  }, [rowsCount, cardsPerRow])

  const handleSelectBits = (bits: SelectedBitModel) => {
    const index = selectedBits.findIndex(
      (bit) => bit.rowIndex === bits.rowIndex && bit.collumnIndex === bits.collumnIndex,
    )

    if (index === -1) {
      setSelectedBits((prevSelectedBits) => [...prevSelectedBits, bits])
    } else {
      setSelectedBits((prevSelectedBits) =>
        prevSelectedBits.filter((bit) => bit.rowIndex !== bits.rowIndex || bit.collumnIndex !== bits.collumnIndex),
      )
    }
  }

  return (
    <motion.div className='bg-background flex flex-col items-center justify-center min-h-[100vh]'>
      {[...Array(rowsCount)].map((_, rowIndex) => {
        const titleBit = drumTypes[rowIndex]
        return (
          <div className='flex gap-2'>
            <div className='h-[50px] w-[100px] flex justify-center items-center font-bold text-xxl text-action'>{titleBit.type}</div>
            <div key={rowIndex} className='flex gap-2 justify-start my-1'>
              {cardIndexes.map((index) => {
                return (
                  <motion.div
                    key={index}
                    className={`mcard-wrapper ${currentIndex % cardsPerRow === index ? 'active' : ''}`}
                  >
                    <MCard
                      selectedBits={selectedBits}
                      currentIndex={currentIndex}
                      index={index}
                      rowIndex={rowIndex}
                      rowsCount={rowsCount}
                      cardsPerRow={cardsPerRow}
                      isActive={currentIndex % cardsPerRow === index}
                      onSelectBit={handleSelectBits}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className='w-full flex justify-center gap-2 items-center'>
        <div className='h-[50px] w-[100px]'/>
        {[...Array(cardsPerRow)].map((_, rowIndex) => (
          <div
            key={rowIndex + 1}
            className={`h-[50px] w-[50px] flex justify-center items-center font-bold text-xxl ${currentIndex % cardsPerRow === rowIndex ? 'text-white' : 'text-error'}`}
          >
            {rowIndex + 1}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default App
