import Web3 from "web3"
import LipToken from '../../abis/LipToken.json'

export const actionTypes = Object.freeze({
  CONNECTION_REQUEST: "CONNECTION_REQUEST",
  CONNECTION_SUCCESS: "CONNECTION_SUCCESS",
  CONNECTION_FAILED: "CONNECTION_FAILED",
  UPDATE_ACCOUNT: "UPDATE_ACCOUNT"
})

const connectRequest = () => ({
  type: actionTypes.CONNECTION_REQUEST
})

const connectSuccess = (payload) => ({
  type: actionTypes.CONNECTION_SUCCESS,
  payload: payload
})

const connectFailed = (msg) => ({
  type: actionTypes.CONNECTION_FAILED,
  payload: msg
})

const updateAccount = (payload) => ({
  type: actionTypes.UPDATE_ACCOUNT,
  payload: payload
})

const handleConnect = () => {
  return async (dispatch) => {
    dispatch(connectRequest())
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum)
      try {
        const account = await window.ethereum.request({
          method: "eth_accounts"
        })
        const networkId = await window.ethereum.request({
          method: "net_version"
        })
        const lipTokenNetworkData = await LipToken.networks[networkId]
        if (lipTokenNetworkData) {
          const lipToken = new web3.eth.Contract(LipToken.abi, lipTokenNetworkData.address)
          dispatch(connectSuccess({
            account: account[0],
            lipToken: lipToken,
            web3: web3
          }))

          // add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(account[0]))
          })
          window.ethereum.on('chainChanged', () => {
            window.location.reload()
          })
        } else {
          // add listeners end
          dispatch(connectFailed("Change network to Polygon."))
        }
      } catch (error) {
        dispatch(connectFailed('Non-Ethereum browser detected. You should consider trying MetaMask!'))
        console.log('err', error)
      }
    } else {
      dispatch(connectFailed('Non-Ethereum browser detected. You should consider trying MetaMask!'))
    }
  }
}

export {

}