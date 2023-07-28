import { FC, ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion'
export interface CardProps {
  readonly className?: string;
  readonly index?: number;
  readonly children?: string | ReactNode
  readonly ref?: React.Ref<HTMLDivElement>;
}

const getRandomColor = (): string => {
  // Генерируем случайные значения для каналов RGB
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Форматируем значения каналов в шестнадцатеричный формат
  const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return hexColor;
};

export const Card: FC<CardProps> = forwardRef(({ className, index, children }, ref) => {
  const color = getRandomColor();
  const cardStyle = {
    backgroundColor: color,
    boxShadow: `0 0 70px -5px ${color}, 0 2px 4px -1px ${color}`,
  };
  const cardHoverStyle = {
    y: -20,
  };

  return <motion.div
    ref={ref}
    className={`h-[50px] w-[50px] rounded-lg text-sm cursor-pointer ${className}`}
    style={cardStyle}
    whileHover={cardHoverStyle}
  >
    {children}
  </motion.div>
})

export const MCard = motion(Card);
