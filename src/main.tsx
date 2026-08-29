import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Take over scroll restoration: the browser would otherwise re-apply the previous
// offset on history back, which animates because :root sets scroll-behavior:smooth.
// Router.tsx restores the home page position itself, instantly.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
