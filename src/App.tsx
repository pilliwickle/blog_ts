import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import { SignIn } from './pages/SignInPage/SignIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<ArticlePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/sign" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
