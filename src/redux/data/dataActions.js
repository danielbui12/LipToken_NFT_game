export const actionTypes = Object.freeze({
  CHECK_DATA_REQUEST: "CHECK_DATA_REQUEST",
  CHECK_DATA_SUCCESS: 'CHECK_DATA_SUCCESS',
  CHECK_DATA_FAILED: 'CHECK_DATA_FAILED'
})

const fetchDataRequest = () => ({
  type: actionTypes.CHECK_DATA_REQUEST
})

const fetchDataSuccess = (payload) => ({
  type: actionTypes.CHECK_DATA_SUCCESS,
  payload: payload
})

const fetchDataFailed = (msg) => ({
  type: actionTypes.CHECK_DATA_FAILED,
  payload: msg
})


export const handleFetchData = (lipToken, account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest())
    try {
      let allOwnerLips = await lipToken.methods.getAddressLips(account).call()
      let allLips = await lipToken.methods.getLips().call();
      dispatch(fetchDataSuccess({
        allLips: allLips,
        allOwnerLips: allOwnerLips
      }))
    } catch (error) {
      console.log("fetchDataFailed", error)
      dispatch(fetchDataFailed("Couldn't load data from contract."))
    }

  }
}