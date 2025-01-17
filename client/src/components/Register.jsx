import React from 'react'
import Button from './Button.jsx'
import Input from './Input.jsx'
import { useState } from "react";

export default function Register() {

  return (
    <>
        <div className='flex flex-col justify-center h-screen items-center bg-blue-800'>
            <div className='p-5'>
                <Input palceHolder={"username"} ID={"username"} />
            </div>
            <div className='p-5'>
                <Input palceHolder={"email"} ID={"email"} />
            </div>
            <div className='p-5'>
                <Input palceHolder={"password"} ID={"password"} />
            </div>
            <div className='p-5'>
                <Button value={"Register"} />
            </div>
        </div>
    </>
  )
}
