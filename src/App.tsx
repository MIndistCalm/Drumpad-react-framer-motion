import React, { useState, useEffect } from 'react'
import './App.css'
import { motion } from 'framer-motion'
import { MCard } from './components'

export const drumTypes = [
  {
    type: 'Kick',
    sound: './sounds/kick.mp3',
  },
  // {
  //   type: 'single',
  //   sound: './sounds/single.mp3',
  // },
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
  // {
  //   type: 'CowBell',
  //   sound: './sounds/cowbell.mp3',
  // },
  {
    type: 'TapTap',
    sound: './sounds/TapTap.ogg',
  },
  {
    type: 'UraYeah',
    sound: './sounds/UraYeah.ogg',
  },
  {
    type: 'higher',
    sound: './sounds/higher.ogg',
  },
  {
    type: 'lower',
    sound: './sounds/lower.ogg',
  },
  {
    type: 'br',
    sound: './sounds/br.ogg',
  },
  // Это на новый год
  // {
  //   type: 'g-major_G_major',
  //   sound: './sounds/g-major_G_major.wav',
  // },
  // {
  //   type: 'e-minor_G_major',
  //   sound: './sounds/e-minor_G_major.wav',
  // },
  // {
  //   type: 'd-major_G_major',
  //   sound: './sounds/d-major_G_major.wav',
  // },
  // {
  //   type: 'cadd9_G_major',
  //   sound: './sounds/cadd9_G_major.wav',
  // },
  // {
  //   type: 'b-minor-barre_B_minor',
  //   sound: './sounds/b-minor-barre_B_minor.wav',
  // },
]

export interface SelectedBitModel {
  rowIndex: number
  collumnIndex: number
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0) // Состояние для хранения текущего индекса элемента
  const rowsCount = drumTypes.length
  const [cardsPerRow, setCardsPerRow] = useState(24)
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
    <div className='bg-background flex flex-col gap-8 items-center justify-center min-h-[100vh]'>
      <div className='bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center gap-5'>
        <div className='flex gap-2 items-center justify-center'>
          <span className='text-[#fff]'>Длина дорожки</span>
          <input
            type='range'
            min={16}
            max={32}
            value={cardsPerRow}
            onChange={(e) => setCardsPerRow(Number(e.target.value))}
          />
        </div>
        <div>
          <button className='text-[#fff]' onClick={() => setSelectedBits([])}>
            Сбросить
          </button>
        </div>
      </div>
      <motion.div>
        {[...Array(rowsCount)].map((_, rowIndex) => {
          const titleBit = drumTypes[rowIndex]
          return (
            <div key={rowIndex} className='flex gap-2'>
              <div className='h-[50px] w-[100px] flex justify-center items-center font-bold text-xxl text-action'>
                {titleBit.type}
              </div>
              <div className='flex gap-2 justify-start my-1'>
                {cardIndexes.map((index) => {
                  return (
                    <motion.div
                      key={`${index}sds`}
                      className={`mcard-wrapper ${currentIndex % cardsPerRow === index ? 'active' : ''} ${index % 4 === 3 ? 'mr-3' : 'mr-0'}`}
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
          <div className='h-[50px] w-[100px]' />
          {[...Array(cardsPerRow)].map((_, rowIndex) => (
            <div
              key={rowIndex + 1}
              className={`h-[50px] ${rowIndex % 4 === 3 ? 'mr-3' : 'mr-0'} w-[50px] flex justify-center items-center font-bold text-xxl ${currentIndex % cardsPerRow === rowIndex ? 'text-white' : 'text-error'}`}
            >
              {rowIndex + 1}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default App
