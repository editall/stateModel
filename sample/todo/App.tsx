import { useState } from 'react'
import './App.css'
import Test from "./test";

function App() {
  const [count, setCount] = useState(0)

  return <Test/>
}

export default App
