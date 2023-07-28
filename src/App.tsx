import './App.css';
import { motion } from 'framer-motion'
import { MCard } from './components';

function App() {

  const animateVariants = {
    hidden: {
      opacity: 0,
      y: -1500,
    },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.02,
        type: 'spring',
      }
    })
  }

  const cardCount = 64;
  const cardIndexes = Array.from({ length: cardCount }, (_, index) => index);

  return (
    <motion.div initial='hidden' animate='visible' className='bg-background flex flex-col items-center justify-center min-h-[100vh]'>
      <div className='w-[456px] h-[456px] flex gap-2 flex-wrap justify-start'>
        {cardIndexes.map((index) => (
          <MCard key={index} custom={index} variants={animateVariants} />
        ))}
      </div>
    </motion.div>
  );
}

export default App;
