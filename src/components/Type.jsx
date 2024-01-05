import React from 'react'

const Type = ({ type, damageValue }) => {
  const bg = `bg-${type}`
  return (
    <div className={`flex items-center justify-center gap-2 px-4 text-[0.8rem] leading-none py-2 rounded-lg capitalize ${bg} `}>
      <span>
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