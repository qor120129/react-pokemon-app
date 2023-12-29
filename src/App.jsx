import { useEffect, useState } from 'react'
import axios from 'axios'
import PokeCard from './components/PokeCard'
import './App.css'


function App() {
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)
  const [search, setSearch] = useState('')




  useEffect(() => {
    fetchPokeDate(true)
  }, [])

  const fetchPokeDate = async (firstFetch) => {
    try {
      const offsetValue = firstFetch ? 0 : offset + limit
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`
      const res = await axios.get(url)
      firstFetch ? setPokemons(res.data.results) : setPokemons([...pokemons, ...res.data.results])
      setOffset(offsetValue)
    } catch (error) {
      console.error(error)
    }
  }

  const changehInput = (e) => {
    setSearch(e.target.value)
  }

  const searchInput = async (e) => {
    setPokemons([])
    e.preventDefault()
    if (search.length > 0) {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
        console.log('search', res)
        const searchPokemonData = {
          url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}`,
          name: search
        }
        setPokemons([searchPokemonData])
      } catch (error) {
        console.error(error)
      }
    } else {
      fetchPokeDate(true)
    }
  }


  return (
    <article className='pt-6' >
      <header className='flex flex-col gap-2 w-full px-4 z-50'>
        <div className="relative z-50">
          <form
            onSubmit={searchInput}
            className='relative flex justify-center items-center w-[25rem] h-6 rounded-lg m-auto '
          >
            <input
              type="text"
              value={search}
              onChange={changehInput}
              className='text-xs w-[25rem] h-10 px-2 py-1 text-gray-800 text-center border-2 border-slate-800 rounded-lg '
            />
            <button
              type='button'
              onClick={searchInput}
              className='text-xs bg-slate-800 text-white w-[4rem] h-10 rounded-r-lg px-2 py-1 text-center absolute border border-slate-800 right-0 hover:bg-slate-700'
            >
              검색
            </button>
          </form>
        </div>
      </header>
      <section className='pt-6 flex flex-col justify-center items-center overflow-auto z-0'>
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {pokemons.length > 0 ? (
            pokemons.map(({ url, name }, index) => (
              <PokeCard key={index} url={url} name={name} />
            ))
          ) : (
            <h2 className='font-medium text-lg text-slate-900 mb-1'>포켓몬이 없습니다.</h2>
          )}
        </div>
      </section>
        <div className="text-center">
          <button
            onClick={() => fetchPokeDate(false)}
            className='bg-slate-800 rounded-lg text-white px-6 py-2 text-base font-bold mt-4'> 더 보기</button>
        </div>
      {/* {pokemons.length > 20 && (
      )} */}
    </article>
  )
}

export default App
