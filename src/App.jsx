import { useEffect, useState } from 'react'
import axios from 'axios'
import PokeCard from './components/PokeCard'
import './App.css'


function App() {

  const [allPokemons, setAllPokemons] = useState([]) // 모든 포켓몬 데이터
  const [displayedPokemons, setDisplayedPokemons] = useState([])  // 보여주는 포켓몬 데이터
  const [search, setSearch] = useState('')
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`

  useEffect(() => {
    fetchPokeDate()
  }, [])

  const changehInput = (e) => {
    setSearch(e.target.value)
  }

  const searchInput = async (e) => {
    e.preventDefault()
    if (search.length > 0) {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
        if (res.data.id) {
          const searchPokemonData = {
            url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}`,
            name: search
          }
          setDisplayedPokemons([searchPokemonData])
        } else {
          setDisplayedPokemons([])
        }
      } catch (error) {
        setDisplayedPokemons([])
        console.error(error)
      }
    } else {
      filterDisplayPokemons(allPokemons, [])
    }
  }

  const filterDisplayPokemons = (allPokemons, displayedPokemons = []) => {
    const limit = displayedPokemons.length + 20
    const showDisplayPokemons = allPokemons.filter((_, index) => index + 1 <= limit)
    setDisplayedPokemons(showDisplayPokemons)
  }

  const fetchPokeDate = async () => {
    try {
      const res = await axios.get(url)
      setAllPokemons(res.data.results)
      filterDisplayPokemons(res.data.results)
    } catch (error) {
      console.error(error)
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
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }, index) => (
              <PokeCard key={index} url={url} name={name} />
            ))
          ) : (
            <h2 className='font-medium text-lg text-slate-900 mb-1'>포켓몬이 없습니다.</h2>
          )}
        </div>
      </section>
      {(allPokemons.length > displayedPokemons.length) && displayedPokemons.length > 1 && (
        <div className="text-center">
          <button
            onClick={() => filterDisplayPokemons(allPokemons, displayedPokemons)}
            className='bg-slate-800 rounded-lg text-white px-6 py-2 text-base font-bold mt-4'> 더 보기</button>
        </div>
      )}
    </article>
  )
}

export default App
