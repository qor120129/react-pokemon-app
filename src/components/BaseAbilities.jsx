import { useRef, useEffect } from 'react'

const BaseAbilities = ({ pokemon, text }) => {
  const bg = `bg-${pokemon.types[0]}`


  return (
    <>
      <h2 className={`${text} font-semibold text-base`}>기본 능력치</h2>
      <div className={`w-full flex items-center justify-center`}>
        <table>
          <tbody>
            {pokemon.stats.map((item, i) => (
              <tr key={i} className={`w-full text-slate-50`}>
                <td className={`sm:px-5`}> {item.name}</td>
                <td className={`px-5 sm:px-3`}>{item.baseStat}</td>
                <td>
                  <div className={`flex items-start h-2 min-w-[10rem] bg-gray-600 rounded-lg overflow-hidden`}>
                    <div className={`h-3 ${bg} w-[${Math.round(item.baseStat * (100 / 255))}%]`}></div>
                  </div>
                </td>
                <td className={`px-2 sm:px-5`}>255</td>

              </tr>
            )
            )}
          </tbody>
        </table>
      </div >
    </>
  )
}

export default BaseAbilities