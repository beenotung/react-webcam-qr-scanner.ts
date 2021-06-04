import React from 'react'
import './Demo.css'
import DemoOneOffScanning from './DemoOneOffScanning'
import DemoContinuousScanning from './DemoContinuousScanning'
import DemoCustomVideoFilter from './DemoCustomVideoFilter'

function App() {
  return (
    <div className="App">
      <h1>
        <a href="https://github.com/beenotung/react-webcam-qr-scanner.ts">
          react-webcam-qr-scanner.ts
        </a>{' '}
        Demo
      </h1>

      <h2>One-Off Scanning</h2>
      <DemoOneOffScanning />

      <h2>Continuous Scanning</h2>
      <DemoContinuousScanning />

      <h2>Custom Video Filter</h2>
      <DemoCustomVideoFilter />
    </div>
  )
}

export default App
