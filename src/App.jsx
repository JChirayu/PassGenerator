import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) { str += '1234567890' }
    if (charAllowed) { str += '!@#$%^&*_+<>?=-`~(){}[]' }

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str[char]
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const handleClick = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-[100vw] h-[100vh] bg-gray-950 flex items-center'>
      <div className='bg-gray-700 rounded-md w-full max-w-2xl max-h-96 mx-auto text-orange-500 px-4 py-1'>
        <div className='text-white text-center text-2xl py-5'>Password Generator</div>
        <div className='flex'>
          <input
            type="text"
            value={Password}
            className='w-full py-3 px-3 rounded-l-md text-black text-xl font-semibold'
            placeholder='password'
            ref={passwordRef}
            readOnly
          />
          <button
            className='rounded-r-md bg-blue-500 px-2 text-white w-28'
            onClick={handleClick}
          >Copy</button>
        </div>
        <div className='flex py-3'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
            className='cursor-pointer'
          /> <label className='px-2'>Lenght: {length}</label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => { setNumberAllowed((prev) => !prev) }}
            className='ml-4 mr-1'
          /><label>Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => { setCharAllowed((prev) => !prev) }}
            className='ml-4 mr-1'
          /><label>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
