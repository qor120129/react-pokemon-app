import { useEffect, useState } from 'react'
import axios from 'axios'
import PokeCard from 'components/PokeCard'
// import '@/App.css'
import AutoComplete from 'components/AutoComplete'


function MainPage() {

  const [allPokemons, setAllPokemons] = useState([]) // 모든 포켓몬 데이터
  const [displayedPokemons, setDisplayedPokemons] = useState([])  // 보여주는 포켓몬 데이터
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`

  useEffect(() => {
    fetchPokeDate()
  }, [])


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
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
          filterDisplayPokemons={filterDisplayPokemons}
        />

      </header>
      <section
        className='pt-6 flex flex-col justify-center items-center overflow-auto z-0'
      >
        <div
          className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl"
        >
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }, index) => (
              <PokeCard key={index} url={url} name={name} />
            ))
          ) : (
            <h2
              className='font-medium text-lg text-slate-900 mb-1'
            >
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      {(allPokemons.length > displayedPokemons.length) && displayedPokemons.length > 1 && (
        <div
          className="text-center"
        >
          <button
            onClick={() => filterDisplayPokemons(allPokemons, displayedPokemons)}
            className='bg-slate-800 rounded-lg text-white px-6 py-2 text-base font-bold mt-4'
          >
            더 보기
          </button>
        </div>
      )}
    </article>
  )
}

export default MainPage
