import { FC, ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SelectedBitModel, drumTypes } from '../App'

const SELCETED_BIT_COLOR = '#2c2c2c'
export interface CardProps {
  className?: string
  selectedBits: SelectedBitModel[]
  currentIndex: number
  index: number
  rowIndex: number
  children?: string | ReactNode
  isActive?: boolean
  rowsCount: number
  cardsPerRow: number
  onSelectBit: (values: SelectedBitModel) => void
}

const getColorForIndex = (index: number, rowsCount: number, cardsPerRow: number): string => {
  // Вычисляем тон цвета в радужном спектре в зависимости от индекса элемента
  const hue = (720 / (rowsCount * cardsPerRow)) * index // Используем общее количество элементов для равномерного распределения цветов
  return `hsl(${hue}, 100%, 50%)`
}

export const Card: FC<CardProps> = ({
  className,
  selectedBits,
  currentIndex,
  index,
  children,
  isActive,
  rowsCount,
  cardsPerRow,
  rowIndex,
  onSelectBit,
}) => {
  const cardHoverStyle = {
    y: -5,
  }
  const findBit = selectedBits.find((bit) => bit.rowIndex === rowIndex && bit.collumnIndex === index)
  const isFindedBit = findBit?.collumnIndex === index && findBit?.rowIndex === rowIndex

  const [drums] = useState(drumTypes)
  const [color, setColor] = useState(
    findBit?.collumnIndex === index && findBit?.rowIndex === rowIndex
      ? SELCETED_BIT_COLOR
      : getColorForIndex(currentIndex, rowsCount, cardsPerRow),
  )

  const handlePlayDrum = (sound: string): void => {
    const audio = new Audio(sound)
    // isFindedBit && audio.play()
    isFindedBit && console.log(audio)
  }

  useEffect(() => {
    if (isActive) {
      setColor(isFindedBit ? '#aaaaaa' : '#eeeeee')
      const drumSound = drums[rowIndex].sound
      handlePlayDrum(drumSound)
      return
    }

    setColor(isFindedBit ? SELCETED_BIT_COLOR : getColorForIndex(currentIndex + index, rowsCount, cardsPerRow))
  }, [isActive, index, currentIndex, rowsCount, cardsPerRow, drums, rowIndex, isFindedBit])

  const cardStyle = {
    backgroundColor: color,
    boxShadow: `0 0 70px -5px ${color}, 0 2px 4px -1px ${color}`,
    border: '1px solid',
  }

  return (
    <motion.div
      // ref={ref}
      className={`h-[50px] w-[50px] rounded-lg text-sm cursor-pointer ${className}`}
      style={cardStyle}
      whileHover={cardHoverStyle}
      onClick={() => onSelectBit({ rowIndex, collumnIndex: index })}
    >
      {children}
    </motion.div>
  )
}

export const MCard = motion(Card)
