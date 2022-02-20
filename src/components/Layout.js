import React from 'react'
import { useSelector } from 'react-redux'
import { Screen, TextTitle, TextSubTitle } from '../styled/globalStyles'

const _color = window.origin + "/images/bg/_color.png"

export default function Layout({ Component, setGlobalRoute, ...rest }) {
  const blockchain = useSelector(state => state.blockchain)
  return (
    <Screen image={_color}>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://facebook.com/huytung.novers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TextTitle>&nbsp; Lip Tokens</TextTitle>
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-muted"><TextSubTitle>{blockchain.account || "0x0"}</TextSubTitle></small>
          </li>
        </ul>
      </nav>
      {
        blockchain.account && blockchain.lipToken && (
          <div className='d-flex mt-5 w-100 justify-content-center'>
            <button onClick={() => setGlobalRoute("/")}>Your Lips</button>
            <button onClick={() => setGlobalRoute("/world-lip")}>Enemy Lips</button>
            <button onClick={() => setGlobalRoute("/transfer")}>Transfer</button>
          </div>
        )
      }
      <Component {...rest} />
    </Screen>
  )
}