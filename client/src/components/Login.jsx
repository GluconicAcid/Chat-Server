import React from 'react'
import Button from './Button.jsx'
import Input from './Input.jsx'

function Login() {
  return (
    <>
        <div className='flex flex-col justify-center h-screen items-center bg-blue-800'>
            <div className='p-5'>
                <Input palceHolder={"username or email"} ID={"username or email"} />
            </div>
            <div className='p-5'>
                <Input palceHolder={"password"} ID={"password"} />
            </div>
            <div>
                <Button value={"Login"} />
            </div>
        </div>
    </>
  )
}

export default Login