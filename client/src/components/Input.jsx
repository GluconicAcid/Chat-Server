import React from 'react'

function Input({palceHolder, ID}) {
  return (
    <>
        <input type="text" placeholder={palceHolder} id={ID} className='bg-gray-600 rounded-md w-80 h-8 text-center border-2 border-black'/>
    </>
  )
}

export default Input