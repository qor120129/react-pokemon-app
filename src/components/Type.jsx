import React from 'react'

const Type = ({ type, damageValue }) => {
  const bg = `bg-${type}`
  return (
    <div>
      <span className={`px-4 text-[0.8rem] leading-none py-2 rounded-lg lh capitalize ${bg}`}>
        {type}
      </span>
      {damageValue && ( 
        <span className={`bg-zinc-200/40 p-[.125rem] rounded-lg`}>
          {damageValue}
        </span>
      )}
    </div>
  )
}

export default Type