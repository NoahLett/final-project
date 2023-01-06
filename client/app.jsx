import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import Header from './components/header';
import Home from './pages/home';
import FAQ from './pages/faq';
import Registration from './pages/sign-up';
import Authentication from './pages/sign-in';
import parseRoute from './lib/parse-route';
import topics from './lib/data';
import PostForm from './pages/post-form';
import ForSale from './pages/for-sale';
import Wanted from './pages/wanted';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.onhashchange = update => {
      const parsed = parseRoute(window.location.hash);
      this.setState({ route: parsed });
    };
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home/>;
    }
    if (path === 'faq') {
      return <FAQ topics={topics}/>;
    }
    if (path === 'sign-up') {
      return <Registration/>;
    }
    if (path === 'sign-in') {
      return <Authentication/>;
    }
    if (path === 'post-form') {
      return <PostForm/>;
    }
    if (path === 'for-sale') {
      return <ForSale/>;
    }
    if (path === 'wanted') {
      return <Wanted/>;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <div className='main-container'>
          <Header/>
          { this.renderPage() }
        </div>
      </AppContext.Provider>
    );
  }
}
