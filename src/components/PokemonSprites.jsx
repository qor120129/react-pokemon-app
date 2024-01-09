import React from 'react'

const PokemonSprites = ({ pokemon }) => {
  return (
    <div className={`flex my-8 flex-wrap justify-center`}>
      {pokemon.sprites.map((item, index) =>
        <img
          key={index}
          src={item.url}
          alt={`${item.name}.sprite_img`}
        />
      )}
    </div>
  )
}

export default PokemonSprites