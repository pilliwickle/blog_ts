import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { RegPage } from './pages/RegPage/RegPage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import { SignInPage } from './pages/SignInPage/SignInPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={<RegPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
