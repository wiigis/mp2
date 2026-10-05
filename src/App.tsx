import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import PokemonDetail from './PokemonDetail'
import GalleryPage from './GalleryPage'
import './App.css'

type Pokemon = {
  id: number
  name: string
  type: string
  height: number
  weight: number
  image: string
}

type SortOption = 'name' | 'id' | 'type' | 'height' | 'weight'

function App() {

  // allowing program to remember info inserted by user
  // rerenders application based on new user info
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // for pokemon data from api (pokemon object)
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => response.json())
      .then((data) => {
        const pokemonRequests = data.results.map(
          (item: { url: string }) =>
            fetch(item.url).then((response) => response.json())
        )

        Promise.all(pokemonRequests)
          .then((pokemonData) => {
            const formattedPokemon = pokemonData.map((item) => ({
              id: item.id,
              name: item.name,
              type: item.types.map((typeInfo: { type: { name: string } }) =>typeInfo.type.name).join(', '),
              height: item.height,
              weight: item.weight,
              image:
                item.sprites.other['official-artwork'].front_default
            }))

            setPokemon(formattedPokemon)
          })
      })
  }, [])

  const filteredPokemon = pokemon
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0

      // sorting either by name or id/height/weight
      if (sortBy === 'name' || sortBy === 'type') {
        comparison = a[sortBy].localeCompare(b[sortBy])
      } else {
        comparison = a[sortBy] - b[sortBy]
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

  return (
    <div className="app">

      <header className="header">
        <h1>Pokémon!</h1>

        <nav>
          <Link to="/gallery" className="nav-button">
            Gallery
          </Link>
        </nav>
      </header>

      <main className="main-content">

        <Routes>

          <Route
            path="/"
            element={
              <>
                {/* search box */}
                <section className="search-panel" id="search">

                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search for Pokémon..."
                    value={searchQuery} // connects input to react state
                    // updating state based on whatever user types
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                  />

                  {/* sort dropdown */}
                  <div className="sort-section">

                    <label htmlFor="sort">Sort by:</label>

                    {/* creating actual dropdown feature with select */}
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(event) =>
                        setSortBy(event.target.value as SortOption)
                      }
                    >
                      <option value="name">Name</option>
                      <option value="id">Pokédex Number</option>
                      <option value="type">Type</option>
                      <option value="height">Height</option>
                      <option value="weight">Weight</option>
                    </select>

                  </div>

                  <div className="order-section">

                    <label>
                      <input
                        type="radio"
                        name="sortOrder"
                        checked={sortOrder === 'asc'}
                        onChange={() => setSortOrder('asc')}
                      />
                      Ascending
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="sortOrder"
                        checked={sortOrder === 'desc'}
                        onChange={() => setSortOrder('desc')}
                      />
                      Descending
                    </label>

                  </div>

                </section>

                <section className="results">

                  {filteredPokemon.length > 0 ? (

                    filteredPokemon.map((item) => (

                      <Link
                        to={`/pokemon/${item.id}`}
                        className="pokemon-card-link"
                        key={item.id}
                      >

                        <article className="pokemon-card">

                          <div className="pokemon-number">
                            #{item.id.toString().padStart(4, '0')}
                          </div>

                          <div className="pokemon-info">

                            <h2>{item.name}</h2>

                            <p>
                              Type: {item.type} | Height: {item.height} | Weight: {item.weight}
                            </p>

                          </div>

                        </article>

                      </Link>
                  ))

                  ) : (

                    <div className="empty-results">

                      <h2>No Pokémon to display</h2>


                    </div>

                  )}

                </section>
              </>
            }
          />

          <Route
            path="/gallery"
            element={<GalleryPage pokemon={pokemon} />}
          />

          <Route
            path="/pokemon/:id"
            element={<PokemonDetail pokemon={pokemon} />}
          />

        </Routes>

      </main>

    </div>
  )
}

export default App