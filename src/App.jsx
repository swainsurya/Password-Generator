import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

  const [length,setLength] = useState(8) ;
  const [number,setNumber] = useState(false) ;
  const [char,setChar] = useState(false) ;

  const [password,setPassword] = useState("") ;

  let passRef = useRef() ;

  let generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;

    if(number) str += "0123456789" ;
    if(char) str += "!~@#$%^&*()_+<>?" ;
    let pass = "" 
    for(let i = 0 ; i<length ; i++) {
      let ch = Math.floor(Math.random()*str.length +1) ;
      pass += str.charAt(ch) ;
    }
    setPassword(pass) ;
  },[length,number,char])

  useEffect(generatePassword,[length,char,number])

  let handleCopy = useCallback(() => {
    passRef.current.select() ;
    window.navigator.clipboard.writeText(password) ;
  }, [password]) ;

  return (
    <div className='flex flex-col'>
      <div className="first flex m-auto my-4">
        <input type="text"
        placeholder='generate password'
        readOnly
        value={password}
        ref={passRef}
        className='bg-gray-300 border-2 border-blue-800 outline-none text-2xl px-1 py-2 rounded-l-md font-bold text-black'
        />
        <button className='bg-blue-700 px-3 py-1 rounded-r-md font-bold text-white hover:bg-blue-800'
        onClick={handleCopy}
        >Copy</button>
      </div>

      <div className="second m-auto flex gap-3">
        <div className="s1 flex items-center gap-1">
         <input type="range" name="length" id=""  min={8} max={16} value={length} onChange={e => {setLength(e.target.value)}}/>
         <label htmlFor="length" className='font-bold cursor-pointer'>Length({length})</label>
        </div>

        <div className="s2 flex items-center gap-1">
          <input type="checkbox" name="numb" id="" onChange={
            e => {
              if(number == false) {
                setNumber(true) ;
              }
              else {
                setNumber(false) ;
              }
            }
          }/>
          <label htmlFor="numb" className='font-bold cursor-pointer'>Number</label>
        </div>

        <div className="s3 flex items-center gap-1">
          <input type="checkbox" name="char" id=""
          onChange={e => {
            if(char == false) setChar(true) ;
            else setChar(false) ;
          }}
          />
          <label htmlFor="char" className='font-bold cursor-pointer'>Character</label>
        </div>

      </div>
    </div>
  )
}

export default App
