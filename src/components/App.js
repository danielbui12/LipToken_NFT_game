import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleConnect } from '../redux/blockchain/blockchainActions'
import { handleFetchData } from '../redux/data/dataActions'
import '../styled/reset.css'
import '../styled/theme.css'
import * as s from '../styled/globalStyles'

function App() {
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)

  React.useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(handleFetchData(blockchain.lipToken, blockchain.account))
    }
  }, [dispatch, blockchain.account, blockchain.lipToken]);

  const mintNFT = (account, _name) => {
    blockchain.lipToken.methods
      .createRandomLip(_name)
      .send({ from: account, value: 1e+16 })
      .once("error", (err) => {
        console.log('mint nft error', err)
      })
      .then((receipt) => {
        console.log('receipt', receipt)
        dispatch(handleFetchData(blockchain.lipToken, account))
      })
  }

  return (
    <s.Screen>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://facebook.com/huytung.novers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <s.TextTitle>&nbsp; Lip Tokens</s.TextTitle>
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-muted"><s.TextSubTitle>{blockchain.account || "0x0"}</s.TextSubTitle></small>
          </li>
        </ul>
      </nav>

      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              {
                !blockchain.account ||
                  !blockchain.lipToken ? (
                  <button onClick={(e) => {
                    e.preventDefault()
                    dispatch(handleConnect())
                  }}>Connect to the game with metamask</button>
                ) : (
                  <>
                    <s.TextTitle>Welcome to the game</s.TextTitle>
                    <button onClick={(e) => {
                      e.preventDefault()
                      mintNFT(blockchain.account, "BUI HUY TUNG :)")
                    }}>Create new random lip</button>
                  </>
                )
              }

              <s.SpacerSmall />
              <s.Container fd={"row"} style={{ flexWrap: 'wrap' }} jc={"space-between"}>

                {
                  data.allLips && data.allLips.map(item => {
                    return (
                      <s.Container key={Math.random()}>
                        <s.TextDescription>ID: {item.id.toString()}</s.TextDescription>
                        <s.TextDescription>DNA: {item.dna.toString()}</s.TextDescription>
                        <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
                        <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                        <s.TextDescription>NAME: {item.name}</s.TextDescription>
                      </s.Container>
                    )
                  })
                }
              </s.Container>
            </div>

          </main>
        </div>
      </div>
    </s.Screen>
  );
}

export default App;
