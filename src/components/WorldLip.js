import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchData } from '../redux/data/dataActions'
import * as s from '../styled/globalStyles'
import LipLayout from './LipLayout';

function WorldLip() {
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(handleFetchData(blockchain.lipToken, blockchain.account))
    }
    setLoading(false)
  }, [dispatch, blockchain.account, blockchain.lipToken]);
  
  function handleAttack(enemyId) {
    setLoading(true);
    blockchain.lipToken.methods
      .attack(parseInt(data.allOwnerLips[0].id.toString()), enemyId)
      .call({
        from: blockchain.account
      }, (err, val) => {
        if (!err) {
          if (val) val = parseInt(val.toString()) 
          if (val === -1) alert("You lose")
          else alert("You won")
          dispatch(handleFetchData(blockchain.lipToken, blockchain.account));
        } else {
          alert(err.data.message.replace("VM Exception while processing transaction: revert", ""))
        }
        setLoading(false);
      })
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <s.SpacerXSmall />
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <s.SpacerSmall />
              <s.Container fd={"row"} style={{ flexWrap: 'wrap', gap: '3em' }} jc={"center"}>
                {
                  data.enemyLips && data.enemyLips.map(item => {
                    return (
                      <LipLayout
                        loading={loading}
                        item={item}
                        key={Math.random()}
                        viewOnly
                        handleAttack={handleAttack}
                      />
                    )
                  })
                }
              </s.Container>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}

export default WorldLip;
