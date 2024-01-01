import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LazyImage from './LazyImage'

const PokeCard = ({ name, url }) => {

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    fetchPokeDetailData()
  }, [url])

  const fetchPokeDetailData = async () => {
    try {
      const res = await axios.get(url)
      const { id, types, name } = res.data
      const pokemonData = {
        id,
        name,
        type: types[0].type.name
      }
      setPokemon(pokemonData)
    } catch (error) {
      console.error(error)
    }
  }

  const bg = `bg-${pokemon?.type}`
  const border = `border-${pokemon?.type}`
  const text = `text-${pokemon?.type}`
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`

  return (
    <>
      {pokemon &&
        <div
          href={`/pokemon/${name}`}
          className={`box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0 bg-slate-800 justify-between items-center`}
        >
          <div
            className={`${text} h-[1.5rem] text-xs w-full pt-1 px-2 text-right rounded-t-lg`}>
            #{pokemon.id.toString().padStart(3, '00')}
          </div>
          <div
            className={`w-full flex items-center justify-center box-border relative h-[5.5rem] basis`}
          >
            <LazyImage
              url={img}
              alt="name"
            />
          </div>
          <div
            className={`${bg} h-[1.5rem] text-xs text-zinc-100 rounded-b-lg uppercase font-medium flex justify-center items-center`}
          >
            {name}
          </div>
        </div>
      }
    </>
  )
}

export default PokeCard