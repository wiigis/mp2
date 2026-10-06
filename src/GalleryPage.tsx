import { useState } from 'react'
import { Link } from 'react-router-dom'

type Pokemon = {
  id: number
  name: string
  type: string
  height: number
  weight: number
  image: string
}

type GalleryPageProps = {
  pokemon: Pokemon[]
}

function GalleryPage({ pokemon }: GalleryPageProps) {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const pokemonTypes = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy'
  ]

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(
        selectedTypes.filter((selectedType) => selectedType !== type)
      )
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const filteredPokemon = pokemon.filter((item) => {

    if (selectedTypes.length === 0) {
      return true
    }

    const types = item.type.split(', ')

    return selectedTypes.some((selectedType) =>
      types.includes(selectedType)
    )
  })

  return (
    <section className="gallery-view">

      <Link to="/" className="back-link">
        ← Back
      </Link>

      <div className="gallery-heading">
        <h2>Pokémon Gallery</h2>
        <p>Browse Pokémon and filter the gallery by type.</p>
      </div>

      <div className="gallery-filters">

        <h3>Filter by Type</h3>

        <div className="type-filters">

          {pokemonTypes.map((type) => (

            <label key={type}>

              <input
                type="checkbox"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />

              {type}

            </label>

          ))}

        </div>

      </div>

      <div className="gallery-grid">

        {filteredPokemon.map((item) => (

            <Link
                to={`/pokemon/${item.id}`}
                state={{ from: '/gallery' }}
                className="gallery-card-link"
                key={item.id}
            >

                <article className="gallery-card">

                <img
                    src={item.image}
                    alt={item.name}
                    className="pokemon-image"
                />

                <div className="gallery-card-info">

                    <span className="gallery-number">
                    #{item.id.toString().padStart(4, '0')}
                    </span>

                    <h3>{item.name}</h3>

                    <p>{item.type}</p>

                </div>

                </article>

            </Link>

        ))}

      </div>

    </section>
  )
}

export default GalleryPage