/**
 * External dependencies
 */
import React, { useState } from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider, ReactReduxContext } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import {
	persistStore,
	persistCombineReducers,
	getStoredState,
} from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import { HashRouter, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * Internal dependencies
 */
import rootReducer from './reducers';
import Root from './components/root';

const config = {
	key: 'primary',
	storage: storage( 'syncbible' ),
	blacklist: [ 'data' ],
};

const history = createBrowserHistory();

const persistedReducer = persistCombineReducers(
	config,
	rootReducer( history )
);

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__( {
				stateSanitizer: ( state ) => {
					if ( ! state.data ) return state;
					const data = {};
					Object.keys( state.data ).forEach( ( key ) => {
						data[ key ] = { __TRUNCATED: true };
					} );
					return {
						...state,
						data,
					};
				},
		  } )
		: compose;

let store = createStore(
	persistedReducer,
	composeEnhancers( applyMiddleware( routerMiddleware( history ), thunk ) )
);

let persistor = persistStore( store );

const App = () => {
	const [ highlightedWord, setHightlightedWord ] = useState( '' );
	// Make this available externally.
	window.updateAppComponent = ( key, value ) => {
		setHightlightedWord( value );
	};

	return (
		<Provider store={ store } context={ ReactReduxContext }>
			<PersistGate loading={ null } persistor={ persistor }>
				<ConnectedRouter
					history={ history }
					context={ ReactReduxContext }
				>
					<HashRouter>
						<Route
							path="/"
							render={ () => (
								<Root highlightedWord={ highlightedWord } />
							) }
						/>
					</HashRouter>
				</ConnectedRouter>
			</PersistGate>
		</Provider>
	);
};

export default App;

export async function getStore() {
	return getStoredState( config );
}

// From https://stackoverflow.com/questions/52465891/how-to-save-redux-store-as-a-downloaded-file-and-then-load-it-back.
const loadState = ( state ) => {
	store = createStore(
		persistedReducer,
		state,
		composeEnhancers(
			applyMiddleware( routerMiddleware( history ), thunk )
		)
	);
	persistor = persistStore( store );
};

export async function loadStore( json ) {
	return new Promise( ( resolve, reject ) => {
		let state;

		try {
			state = JSON.parse( json );
		} catch ( err ) {
			return reject( err );
		}

		if ( ! persistor ) {
			return resolve( loadState( state ) );
		}
		persistor
			.purge()
			.then( () => {
				return resolve( loadState( state ) );
			} )
			.catch( () => {
				return resolve( loadState( state ) );
			} );
	} );
}
