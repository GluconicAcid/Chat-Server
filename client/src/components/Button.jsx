import React from 'react'

function Button({value}) {
    return (
        <>
            <button className='bg-black text-white rounded-md w-32 h-10 text-xl'>{value}</button>
        </>
    )
}

export default Button