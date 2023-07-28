import React from 'react';
import logo from './logo.svg';
import './App.css';
import { motion } from 'framer-motion'

function App() {

  const imageVariants = {
    hidden: {
      x: -100,
      opacity: 0
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.4
      }
    })
  }

  return (
    <motion.div initial='hidden' animate='visible' className="App">
      <header className="App-header">
        

        <motion.img custom={1} variants={imageVariants} src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </motion.div>
  );
}

export default App;
