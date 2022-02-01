import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleConnect } from '../redux/blockchain/blockchainActions'
import { handleFetchData } from '../redux/data/dataActions'
import '../styled/reset.css'
import '../styled/theme.css'
import * as s from '../styled/globalStyles'
import LipRenderer from './lipRenderer';

const _color = window.origin + "/images/bg/_color.png"

function App() {
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(handleFetchData(blockchain.lipToken, blockchain.account))
    }
  }, [dispatch, blockchain.account, blockchain.lipToken]);

  const mintNFT = (_name) => {
    setLoading(true);
    blockchain.lipToken.methods
      .createRandomLip(_name)
      .send({
        from: blockchain.account,
        value: blockchain.web3.utils.toWei("0.01", "ether"),
      }, () => {
        setLoading(false);
        dispatch(handleFetchData(blockchain.lipToken, blockchain.account));
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
  };

  const handleLevelUpLip = (_id) => {
    setLoading(true);
    blockchain.lipToken.methods
      .levelUp(_id)
      .send({
        from: blockchain.account
      }, () => {
        setLoading(false);
        dispatch(handleFetchData(blockchain.lipToken, blockchain.account));
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
  };

  return (
    <s.Screen image={_color}>
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
                    <button disabled={loading} onClick={(e) => {
                      e.preventDefault()
                      mintNFT("BUI HUY TUNG :)")
                    }}>Create new random lip</button>
                  </>
                )
              }
              {
                blockchain.errMesg && (
                  <>
                    <s.SpacerXSmall />
                    <s.TextDescription>{blockchain.errMesg}</s.TextDescription>
                  </>
                )
              }

              <s.SpacerSmall />
              <s.Container fd={"row"} style={{ flexWrap: 'wrap', gap: '3em' }} jc={"center"}>

                {
                  data.allLips && data.allLips.map(item => {
                    return (
                      <s.Container key={Math.random()}>

                        <LipRenderer lip={item} />
                        <s.SpacerXSmall />
                        <s.Container>
                          <s.TextDescription>ID: {item.id.toString()}</s.TextDescription>
                          <s.TextDescription>DNA: {item.dna.toString()}</s.TextDescription>
                          <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
                          <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                          <s.TextDescription>NAME: {item.name}</s.TextDescription>
                          <s.SpacerXSmall />
                          <button disabled={loading} onClick={(e) => {
                            e.preventDefault()
                            handleLevelUpLip(parseInt(item.id.toString()))
                          }}>Level up</button>
                        </s.Container>
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
