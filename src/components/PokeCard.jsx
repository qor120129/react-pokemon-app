import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const PokeCard = ({ name, url }) => {

  const [pokemons, setPokemons] = useState()

  useEffect(() => {
    fetchPokeDetailData()
  }, [])

  const fetchPokeDetailData = async () => {
    try {
      const res = await axios.get(url)
      const { id, types, name } = res.data
      const pokemonData = {
        id,
        name,
        type: types[0].type
      }
      setPokemons(pokemonData)
    } catch (error) {
      console.log(error)
    }
  }

  // const  formatPokemonData=(params) =>{
  //   const { id, types, name } = params
  //   const pokemon = {
  //     id,
  //     name,
  //     type: types[0].type
  //   }
  //   // return pokemon
  //   setPokemons(pokemon)
  // }
  const click=()=> {
    console.log(pokemons)
  }

  return (
    <>
      <div onClick={click}>{name}</div>
    </>
  )
}

export default PokeCard