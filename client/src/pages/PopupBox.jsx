import React from 'react'

function PopupBox({visible,data,close}) {
    if(!visible)
        return;
  return (
    <div className='absolute top-52 left-10 flex items-center justify-center flex-col'>
    <div className='sm:w-96 w-auto text-justify bg-black h-auto p-2 rounded-lg overflow-auto text-white flex items-center justify-center flex-col'>
    <button className='text-3xl font-bold self-end text-white p-2 rounded-full bg-black' onClick={close}>X</button>
      {data}
    </div>
    </div>
  )
}

export default PopupBox