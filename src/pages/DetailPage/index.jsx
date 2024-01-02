import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const DetailPage = () => {
  const [pokemon, setPokemon] = useState(true)
  const [loading, setLoading] = useState(true)


  const params = useParams()
  const pokemonId = params.id
  const url = `https://pokeapi.co/api/v2/pokemon`

  useEffect(() => {
    detailPokeDate()
  }, [])


  async function detailPokeDate() {
    try {
      const { data } = await axios.get(`${url}/${pokemonId}`)
      if (data) {
        const { name, id, types, weight, height, stats, abilities } = data
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id)
        const Demage = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get(i.type.url)
            return type.data.damage_relations
          })
        )

        const formattedPokemon = {
          id,
          name,
          weight: weight / 10,
          height: height / 10,
          next: nextAndPreviousPokemon.next,
          previous: nextAndPreviousPokemon.previous,
          abilities: formatAbilities(abilities),
          stats: formatStats(stats),
          Demage
        }
        setLoading(false)
        setPokemon(formattedPokemon)

      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getNextAndPreviousPokemon(id) {
    const nextAndPreviouUrlPokemon = `${url}?limit=1&offset=${id - 1}`
    const nextAndPreviousPokemon = await axios.get(nextAndPreviouUrlPokemon)
    const { data } = nextAndPreviousPokemon
    const nextPokemon = data.next && (await axios.get(data.next))
    const previousPokemon = data.previous && (await axios.get(data.previous))
    return {
      next: nextPokemon?.data?.results?.[0]?.name,
      previous: previousPokemon?.data?.results?.[0]?.name
    }
  }


  const formatAbilities = (abilities) => {
    return abilities.filter((_, i) => i <= 2)
      .map((item) => item.ability?.name.replaceAll('-', ''))
  }

  const formatStats = ([
    statsHP,
    statsATK,
    statsDEF,
    statsSATK,
    statsSDEP,
    statsSPD
  ]) => [

      { name: 'Hit Points', baseStat: statsHP.base_stat },
      { name: 'Attack', baseStat: statsATK.base_stat },
      { name: 'Defense', baseStat: statsDEF.base_stat },
      { name: 'Special Attack', baseStat: statsSATK.base_stat },
      { name: 'Special Defense', baseStat: statsSDEP.base_stat },
      { name: 'Speed', baseStat: statsSPD.base_stat },
    ]


  return (
    <>
      {loading && (
        <div>
          ..loading
        </div>
      )}
      <div>{pokemon.name}</div>
    </>
  )
}

export default DetailPage