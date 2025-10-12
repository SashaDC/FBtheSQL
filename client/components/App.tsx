import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'
// I've made it so that it renders things on the Home.tsx component via the outlet/routes.
// I've also added the "Semantic Elements" for later use. (eg. header, main, footer.)
// Credentials is a useState that holds a boolean in the tab's session storage and uses the useEffect to change the credentials if any updates to the state happen.

function App() {
  const [credentials, setCredentials] = useState<{
    loggedIn: boolean
    userId: number | null
  } | null>(() => {
    const saved = sessionStorage.getItem('credentials')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    sessionStorage.setItem('credentials', JSON.stringify(credentials))
  }, [credentials])

  return (
    <>
      <div className="app grid-container">
        <header className="grid-header">
          <h1>FB the SQL</h1>
        </header>
        <main className="grid-main">
          <Outlet context={{ credentials, setCredentials }} />
        </main>
        <footer className="grid-footer">
          <div>
            <p>Developed by Cypress, Jen, Luis and Sasha</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
