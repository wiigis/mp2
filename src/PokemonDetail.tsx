import { Link, useParams, useLocation } from 'react-router-dom'

type Pokemon = {
  id: number
  name: string
  type: string
  height: number
  weight: number
  image: string
}

type PokemonDetailProps = {
  pokemon: Pokemon[]
}

function PokemonDetail({ pokemon }: PokemonDetailProps) {

  const { id } = useParams()
  const location = useLocation()
  const backRoute = location.state?.from === '/gallery'? '/gallery' : '/'
  

  // finding specific pokemon based on their pokedex #
  // attached to url
  const currentIndex = pokemon.findIndex(
    (item) => item.id === Number(id)
  )

  const selectedPokemon = pokemon[currentIndex]

  if (!selectedPokemon) {
    return (
      <div className="detail-message">
        <h2>Pokémon not found</h2>

        <Link to={backRoute} className="back-link">
          ← Back
        </Link>
      </div>
    )
  }

  const previousPokemon =
    currentIndex > 0
      ? pokemon[currentIndex - 1]
      : pokemon[pokemon.length - 1]

  const nextPokemon =
    currentIndex < pokemon.length - 1
      ? pokemon[currentIndex + 1]
      : pokemon[0]

  return (
    <section className="detail-view">

      <Link to={backRoute} className="back-link">
        ← Back
      </Link>

      <div className="detail-card">

        <div className="detail-image-section">

          <img
            src={selectedPokemon.image}
            alt={selectedPokemon.name}
            className="detail-image"
          />

        </div>

        <div className="detail-info">

          <span className="detail-number">
            #{selectedPokemon.id.toString().padStart(4, '0')}
          </span>

          <h2>{selectedPokemon.name}</h2>

          <div className="detail-attributes">

            <div className="detail-attribute">
              <span>Type</span>
              <strong>{selectedPokemon.type}</strong>
            </div>

            <div className="detail-attribute">
              <span>Height</span>
              <strong>{selectedPokemon.height}</strong>
            </div>

            <div className="detail-attribute">
              <span>Weight</span>
              <strong>{selectedPokemon.weight}</strong>
            </div>

          </div>

        </div>

      </div>

      <div className="detail-navigation">

        <Link
          to={`/pokemon/${previousPokemon.id}`}
          state={{ from: backRoute }}
          className="detail-nav-button"
        >
          ← Previous
        </Link>

        <Link
          to={`/pokemon/${nextPokemon.id}`}
          state={{ from: backRoute }}
          className="detail-nav-button"
        >
          Next →
        </Link>

      </div>

    </section>
  )
}

export default PokemonDetail