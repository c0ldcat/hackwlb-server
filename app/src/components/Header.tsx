import React from 'react'
import { useBlogData, useBlogDataLoadingState } from '../BlogData'
import { useHistory, useLocation } from 'react-router-dom'
import './Header.scss'

type Location = {
  pathname: string
}

const virtualCommands = [
  l => { if (l.pathname === '/') return 'screenfetch' },
  l => { if (l.pathname.match(/^\/posts\/?$/)) return 'ls /posts'},
  l => 'cat ' + l.pathname.replace(/\/$/, '').replace(/\.[^./]*/, '')
] as ((locaction: Location) => string | undefined)[]

function convertUrlToVirtualCommand(location: Location) {
  let res = ''
  for (let f of virtualCommands) {
    res = f(location) || ''
    if (res) return res
  }
  return `cat ${location.pathname}`
}

export default function Header() {
  const blogData = useBlogData()
  const { state, retry } = useBlogDataLoadingState()
  const { push: goTo } = useHistory()
  const { pathname } = useLocation()

  return <div className="terminal-nav blog-header">
    <div className="command-line">
      <span className={`ps1 ${state}`} onClick={() => {
        if (state === 'rejected') {
          retry()
        } else {
          goTo('/')
        }
      }} />
      <span>
        {`${convertUrlToVirtualCommand({pathname})}`}
      </span>
      { state === 'pending' && <span
        style={{
          margin: '0 0.3em',
          color: 'var(--secondary-color)'
        }}
      >...</span> }
    </div>
    <nav className="terminal-menu" style={{
      width: 'auto',
      flexGrow: 1
    }}>
      <ul>
        {(blogData.nav ?? []).map(n => <li key={n.name}>
          <a
            className="menu-item"
            onClick={() => { goTo(n.href) }}
          >{n.name}</a>
        </li>)}
      </ul>
    </nav>
  </div>
}