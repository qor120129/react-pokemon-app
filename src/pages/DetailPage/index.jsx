import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import NotFound from 'pages/NotFound'
import { Loading } from '@/assets/Loading'
import { LessThan } from '@/assets/LessThan'
import { GreaterThan } from '@/assets/GreaterThan'
import { ArrowLeft } from '@/assets/ArrowLeft'
import DetailInfo from 'components/DetailInfo'
import BaseAbilities from 'components/BaseAbilities'
import Type from 'components/Type'
import DamageModal from '../../components/DamageModal'

const DetailPage = () => {
  const [pokemon, setPokemon] = useState(true)
  const [loading, setLoading] = useState(true)
  const [DamageModalOpen, setDamageModalOpen] = useState(false)


  const params = useParams()
  const pokemonId = params.id
  const url = `https://pokeapi.co/api/v2/pokemon`

  useEffect(() => {
    detailPokeDate()
  }, [pokemonId])


  async function detailPokeDate() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${url}/${pokemonId}`)
      if (data) {
        const { name, id, types, weight, height, stats, abilities, sprites } = data
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id)
        const damages = await Promise.all(
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
          types: types.map(e => e.type.name),
          damages,
          sprites: formatSprites(sprites)
        }
        setLoading(false)
        setPokemon(formattedPokemon)
      }
    } catch (error) {
      setLoading(false)
      setPokemon()
      console.error(error)
    }
  }
  console.log(pokemon)

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

  const formatSprites = (sprites) => {
    // const newSprites = { ...sprites }
    // Object.keys(newSprites)
    //   .filter((item) => {
    //     if (typeof newSprites[item] !== 'string') {
    //       return delete newSprites[item]
    //     }
    //   })

    const newSprites = { ...sprites }
    const res = Object.entries(newSprites)
      .filter(([item, value]) => {
        return typeof value === 'string'
      })
      .reduce((acc, [name, value]) => {
        console.log('ascf', name, value)
        return (acc = [...acc, { ['name']: name, ['url']: value }])
      }, [])

    return res

  }

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`
  const bg = `bg-${pokemon?.types?.[0]}`
  const text = `text-${pokemon?.types?.[0]}`

  return (
    <>
      {loading && (
        <Loading className={`absolute h-auto w-auto top-1/2 -translate-x-1/2 left-1/2 z-50`} />
      )}
      {(!pokemon && !loading) && (
        <NotFound />
      )}
      {(pokemon && !loading) && (
        <article className='flex w-full items-center flex-col'>
          <div className={`${bg} w-full h-full flex flex-col z-0 items-center justify-end overflow-hidden relative`} >
            {pokemon.previous && (
              <Link
                className={`absolute top-1/2 left-1 -translate-y-1/2 z-50 p-4`}
                to={`/pokemon/${pokemon.previous}`}
              >
                <LessThan className={`w-5 h-8 p-1`} />
              </Link>
            )}
            {pokemon.next && (
              <Link
                className={`absolute top-1/2 right-1 -translate-y-1/2 z-50  p-4`}
                to={`/pokemon/${pokemon.next}`}
              >
                <GreaterThan className={`w-5 h-8 p-1`} />
              </Link>
            )}
            <section className={`w-full h-full flex flex-col items-center justify-end p-4 box-border`}>
              <div className={`flex items-center justify-between w-full`}>
                <div className={`flex justify-start items-center w-full gap-2`} >
                  <Link to='/' >
                    <ArrowLeft className={`ww6 h-8 text-slate-50`} />
                  </Link>
                  <h1 className={`text-slate-50 font-bold capitalize`}>
                    {pokemon.name}
                  </h1>
                </div>
                <div className={`text-slate-50 font-bold `}>
                  #{pokemon.id?.toString().padStart(3, '00')}
                </div>
              </div>
              <div className={`relative max-w-[15.5rem] h-auto z-20 -mb-16`}>
                <img
                  src={img}
                  alt={pokemon.name}
                  height='auto'
                  width='100%'
                  className={`object-contain h-full`}
                />
              </div>
            </section>
            <section
              className={`bg-gray-800 flex w-full h-full min-h-[65%] flex-col items-center pt-14 pb-4 px-5 z-10 gap-3`}
            >
              <div className='flex gap-3 font-bold cursor-pointer'
                onClick={() => setDamageModalOpen(true)} >
                {pokemon?.types?.map((type, i) => (
                  <Type key={i} type={type} />
                ))}
              </div>
              <DetailInfo pokemon={pokemon} text={text} />
              <BaseAbilities pokemon={pokemon} text={text} />
              <div className={`flex my-8 flex-wrap justify-center`}>
                {pokemon.sprites.map((item, index) =>
                  <img
                    key={index}
                    src={item.url}
                    alt={`${item.name}.sprite_img`}
                  />
                )}
              </div>
            </section>
            {DamageModalOpen && (
              <DamageModal damages={pokemon.damages} setDamageModalOpen={setDamageModalOpen}>
              </DamageModal>
            )}
          </div>

        </article>
      )}
    </>
  )
}

export default DetailPage