import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'
// I've made it so that it renders things on the Home.tsx component via the outlet/routes.
// I've also added the "Semantic Elements" for later use. (eg. header, main, footer.)
// Credentials is a useState that holds a boolean in the tab's session storage and uses the useEffect to change the credentials if any updates to the state happen.

function App() {
  const [credentials, setCredentials] = useState(() => {
    const saved = sessionStorage.getItem('credentials')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    sessionStorage.setItem('credentials', JSON.stringify(credentials))
  }, [credentials])

  return (
    <>
      <div className="app">
        <header>
          <h1>FB the Sequel</h1>
        </header>
        <main>
          <Outlet context={{ credentials, setCredentials }} />
        </main>
        <footer></footer>
      </div>
    </>
  )
}

export default App
