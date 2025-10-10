import { Outlet } from 'react-router'

// I've made it so that it renders things on the Home.tsx component via the outlet/routes.
// I've also added the "Semantic Elements" for later use. (eg. header, main, footer.)

function App() {
  return (
    <>
      <div className="app">
        <header>
          <h1>FB the Sequel</h1>
        </header>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </>
  )
}

export default App
