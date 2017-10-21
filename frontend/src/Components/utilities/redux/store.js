import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/combine';
import middleware from './middleware/middleware';

export default createStore(reducers, compose(applyMiddleware(...middleware)));
