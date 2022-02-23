import React from 'react'
import { useSelector } from 'react-redux'
import { Screen, TextTitle, TextSubTitle } from '../styled/globalStyles'

const _color = window.origin + "/images/bg/_color.png"

export default function Layout({ Component, setGlobalRoute, ...rest }) {
  const blockchain = useSelector(state => state.blockchain)
  return (
    <Screen image={_color}>
      <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://facebook.com/huytung.novers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TextTitle>&nbsp; Lip Tokens</TextTitle>
        </a>
        {
          blockchain.account && blockchain.lipToken && (
            <div className='d-flex w-100 justify-content-center button__header'>
              <button onClick={() => setGlobalRoute("/")}>Your Lips</button>
              <button onClick={() => setGlobalRoute("/enemy-lip")}>Enemy Lips</button>
              <button onClick={() => setGlobalRoute("/world-lip")}>World Lips</button>
              <button onClick={() => setGlobalRoute("/transfer")}>Transfer</button>
            </div>
          )
        }
        <ul className="navbar-nav px-3 d-flex flex-row">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-muted"><TextSubTitle pd="20px 25px">{blockchain.account || "0x0"}</TextSubTitle></small>
          </li>
          {
            blockchain.account && blockchain.lipToken && (
            <li className='nav-item text-nowrap d-none d-sm-none d-sm-block ml-3'>
              <button className='log_out'>Log out</button>
            </li>
            )
          }
        </ul>
      </nav>
      <Component {...rest} />
    </Screen>
  )
}