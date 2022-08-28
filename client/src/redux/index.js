import reducer from './Reducer/index.js';
import {createStore, applyMiddleware, compose} from "redux"
import ReduxThunk from 'redux-thunk';

//para poder acceder a la herramienta reduxdevtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Para poder trabajar con cosas asincronas o funciones no puras ya que el reducer lo restringe
const store = createStore(reducer, composeEnhancers(applyMiddleware(ReduxThunk)));
//para pasarselo al provaider que es el encargado de abrazar toda nuestra app
export default store