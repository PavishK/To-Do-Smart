import React from 'react'
import "./App.css";

function LoadingSpinner({loading}) {

    if(!loading)
        return null ;
      else
      return (
        <div className='fixed inset-0 flex items-center justify-center bg-white opacity-60 transition-all delay-100 ease-in-out'>
            <div className='loading-animation'>
            </div>
        </div>
      )
}

export default LoadingSpinner