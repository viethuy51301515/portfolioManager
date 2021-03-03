import React from 'react';
import './App.scss'
import MenuLeft from './components/menu';
import Header from './components/header'
import Layout from './components/layout';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import combine from './reducers'
const store = createStore(combine);
function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <Layout />
        </Provider>
        
    </div>
  );
}
export default App;
