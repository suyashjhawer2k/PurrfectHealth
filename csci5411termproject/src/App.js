import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import Home from './Home'
import Header from './Header';
import Footer from './Footer';
import History from './History';
import About from './About';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow mt-[5%]">
          <Routes>
            <Route
              path="/"
              element={
                <Authenticator>
                  {({ signOut, user }) => (
                    <Home user={user} signOut={signOut} />
                  )}
                </Authenticator>
              }
            />
            <Route
              path="/history"
              element={
                <Authenticator>
                  {({ signOut, user }) => (
                    <History user={user} signOut={signOut} />
                  )}
                </Authenticator>
              }
            />
             <Route
              path="/about"
              element={
                <Authenticator>
                  {({ signOut, user }) => (
                    <About user={user} signOut={signOut} />
                  )}
                </Authenticator>
              }
            />
          </Routes>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}
export default App;