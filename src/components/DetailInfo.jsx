import React from 'react'
import { Balance } from '@/assets/Balance'
import { Vector } from '@/assets/Vector'

const DetailInfo = ({ pokemon, text }) => {
  return (
    <>
      <h2 className={`${text} font-semibold text-base`}>정보</h2>
      <div className={`flex w-full max-w-[400px] justify-between text-center`}>
        <div className={`w-full text-slate-50`}>
          <h3 className={`text-[0.8rem] mb-2 capitalize`}>weight</h3>
          <div className={`flex gap-2 items-center justify-center text-sm`}>
            <Balance />
            {pokemon?.weight}kg
          </div>
        </div>
        <div className={`w-full text-slate-50`}>
          <h3 className={`text-[0.8rem] mb-2 capitalize`}>height</h3>
          <div className={`flex gap-1 items-center justify-center text-sm`}>
            <Vector />
            {pokemon?.height}m
          </div>
        </div>
        <div className={`w-full text-slate-50`}>
          <h3 className={`text-[0.8rem] mb-2 capitalize`}>abilities</h3>
          <div className={`flex flex-col items-center justify-center`}>
            {pokemon?.abilities?.map((e, i) => (
              <div key={i} className={`capitalize text-[0.6rem]`}>
                {e}
              </div>
            ))}
          </div>
        </div>
      </div></>
  )
}

export default DetailInfo