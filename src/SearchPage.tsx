import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

type Pokemon = {
  id: number
  name: string
  type: string 
  height: number
  weight: number
}

type SortOption = 'name' | 'id' | 'type' | 'height' | 'weight' 

function App() {

  // allowing program to remember info inserted by user
  // rerenders application based on new user info 
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // for pokemon data from api (pokemon object)
  const pokemon: Pokemon[] = []

  const filteredPokemon = pokemon
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0

      // sorting either by name or id/height/weight
      if (sortBy === 'name' || sortBy === 'type') {
        comparison = a.name.localeCompare(b.name)
      } else {
        comparison = a[sortBy] - b[sortBy]
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

  return (
    <div className="app">
      <header className="header">
        <h1>Pokémon Directory</h1>

        <nav>
          <a href="#gallery">Gallery</a>
        </nav>
      </header>

      <main className="main-content">
        {/* search box */}
        <section className="search-panel" id="search">

        
          <input
            type="text"
            className="search-input"
            placeholder="Search for Pokémon..."
            value={searchQuery}  // connects input to react state
            // updating state based on whatever user types
            onChange={(event) => setSearchQuery(event.target.value)}
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
              <article className="pokemon-card" key={item.id}>
                <div className="pokemon-number">
                  #{item.id.toString().padStart(4, '0')}
                </div>

                <div className="pokemon-info">
                  <h2>{item.name}</h2>
                  <p>
                    Height: {item.height} | Weight: {item.weight}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-results">
              <h2>No Pokémon to display</h2>
              <p>Pokémon will appear here once data is loaded.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}


export default App
