import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { RegPage } from './pages/AuthPage/AuthPage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import { SignInPage } from './pages/Login Page/LoginPage';
import { EditArticle } from './pages/Edit Article/EditArticle';
import { EditProfile } from './pages/EditProfilePage/EditProfile';
import { RequireAuth } from './RequireAuth/RequireAuth';
import { CreateArticle } from './pages/Create Article/CreateArticle';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={<RegPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route
            path="/create-article"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-article"
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
