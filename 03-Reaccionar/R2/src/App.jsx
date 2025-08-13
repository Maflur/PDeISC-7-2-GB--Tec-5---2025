import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import paginainicio from './components/paginaInicio/Titulo';
import './App.css'
import Titulo from './components/paginaInicio';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Titulo></Titulo>
    </div>
  )
}

export default App
