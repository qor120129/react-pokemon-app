import { useRef, useState } from 'react'

const AutoComplete = ({ allPokemons, setDisplayedPokemons, filterDisplayPokemons }) => {
  const [search, setSearch] = useState('')

  const changehInput = (text) => {
    console.log(text)
    setSearch(text)

  }
  const filterPokemon = (text) => {
    console.log(text)
    const value = text.toLowerCase()
    return value? allPokemons.filter((item) => item.name.includes(text)) : []
  }
  const searchFilterPokemon = (text) => {
    const value = text.toLowerCase()
    return value ? allPokemons.filter((item) => item.name === text) : []
  }

  const searchInput = async (e) => {
    e.preventDefault()
    if (search.length > 0) {
      const text = search.trim()
      setDisplayedPokemons(searchFilterPokemon(text))
      setSearch('')
    } else {
      filterDisplayPokemons(allPokemons, [])
    }
  }

  const autoComplete = (text) => {
    const filterArray = filterPokemon(text)
    return filterArray[0]?.name === text ? [] : filterArray

  }

  return (
    <div className="relative z-50">
      <form
        onSubmit={searchInput}
        className='relative flex justify-center items-center max-[472px]:w-full w-[24rem] h-6 rounded-lg m-auto '
      >
        <input
          type="text"
          value={search}
          onChange={(e) => changehInput(e.target.value)}
          className='text-xs max-[472px]:w-full  w-[24rem] h-10 px-2 py-1 text-gray-800 text-center border-2 border-slate-800 rounded-lg'
        />

        <button
          type='button'
          onClick={searchInput}
          className='text-xs bg-slate-800 text-white w-[4rem] h-10 rounded-r-lg px-2 py-1 text-center absolute border border-slate-800 right-0 hover:bg-slate-700'
        >
          검색
        </button>
      </form>
      {autoComplete(search).length > 0 && (
        <div
          className={`w-full flex bottom-0 h-0 flex-col absolute justify-center items-center translate-y-2`}
        >
          <div
            className={`w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[8px] border-gray-700 translate-y-1/2`}
          >
          </div>
          <ul
            className={`w-40 max-h-[134px] py-1 bg-gray-700 rounded-lg absolute top-0 overflow-auto none scrollbar-none`}
          >
            {autoComplete(search).map((e, i) => (
              <li key={i} >
                <button
                  onClick={() => changehInput(e.name)}
                  className={`text-white w-full hover:bg-gray-600 p-[4px]`}
                >
                  {e.name}
                </button>
              </li>
            ))
            }
          </ul>

        </div>
      )}
    </div>
  )
}

export default AutoComplete