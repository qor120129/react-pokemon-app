import React from 'react'
import { Link } from 'react-router-dom'
import { Pokeball } from '../../assets/Pokeball'

const NotFound = () => {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 w-full m-auto text-center`}
    >
      <div className="">
        <div className=''>
          <Pokeball className={`w-20 h-20 animate-bounce m-auto text-slate-500`}  />

        </div>
        <h1 className={`font-bold text-9xl m-7 text-slate-900`} >
          404
        </h1>
        <p
          className={`text-4xl text-slate-700`}
        >
          Sorry, Page Not Found
        </p>
      </div>
      <div
        className={`font-bold m-20`}
      >
        <Link
          to='/'
          className={` bg-slate-900 text-slate-50 px-7 py-2 rounded-lg hover:bg-slate-700`}
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound 