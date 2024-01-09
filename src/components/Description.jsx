import React from 'react'

const Description = ({ pokemon, text }) => {
  console.log(pokemon.description)
  return (
    <>
      <h2 className={`${text} font-semibold text-base`}>설명</h2>
      <p className={`text-md leading-7 text-slate-50 max-w-[24rem] text-center`} >{pokemon.description}</p>
    </>
  )
}

export default Description