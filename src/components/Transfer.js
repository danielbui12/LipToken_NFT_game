import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchData } from '../redux/data/dataActions'
import * as s from '../styled/globalStyles'

export default function Transfer() {
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(handleFetchData(blockchain.lipToken, blockchain.account))
    }
  }, [dispatch, blockchain.account, blockchain.lipToken]);

  function handleTransferLip(e) {
    e.preventDefault()
    setLoading(true)
    blockchain.lipToken.methods
      .transferFrom(blockchain.account, e.target.to.value, parseInt(e.target.from.value))
      .send({
        from: blockchain.account
      }, (err) => {
        if (!err) {
          alert("Transfer successfully!")
          dispatch(handleFetchData(blockchain.lipToken, blockchain.account));
        } else {
          alert("Error when sending message!")
        }
        setLoading(false)
      })
  }

  return (
    <s.Container js="center" ai="center" >
      <s.SpacerMedium/>
      <form 
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
        onSubmit={handleTransferLip}
      >
        <table>
          <tbody>
            <tr>
              <td><s.TextSubTitle><label htmlFor='from'>Select your lip: </label></s.TextSubTitle></td>
              <td>
                <select id="from" required>
                  {data.allOwnerLips.map(item => {
                    return (
                      <option
                        value={item.id.toString()}
                        key={Math.random()}
                        dangerouslySetInnerHTML={{
                          __html: `ID: ${item.id.toString()}    NAME: ${item.name}    RARITY: ${item.rarity}`
                        }}
                      />
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td><s.TextSubTitle><label htmlFor='to'>To: </label></s.TextSubTitle></td>
              <td><input id="to" required placeholder='Address'/></td>
            </tr>
          </tbody>
        </table>
        <input disabled={loading} type="submit" style={{margin: 'auto', marginTop: '1em'}}/>
      </form>
    </s.Container>
  )
}
