import AuthorsList from './Components/AuthorsList';
import BooksList from './Components/BooksList';
import DefineAuthor from './Components/DefineAuthor';
import DefineBook from './Components/DefineBook';
import './App.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Reducers/reducer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "antd/dist/antd.css";

function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Router>
        <div className="menu">
          <Link to="/authors">Authors list</Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/books">Books list</Link>
        </div>
        <Switch>
          <Route path="/authors">
            <AuthorsList />
          </Route>
          <Route path="/books">
            <BooksList />
          </Route>
          <Route path="/defineAuthor">
            <DefineAuthor />
          </Route>
          <Route path="/defineBook">
            <DefineBook />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
