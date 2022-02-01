import {
  applyMiddleware, compose,
  createStore, combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import blockchainReducer from './blockchain/blockchainReducer'

const rootReducer = combineReducers({
  blockchain: blockchainReducer
})

const middlewares = [thunk]
const composeEnhancers = compose(applyMiddleware(...middlewares))

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers)
}

const store = configureStore()

export default store