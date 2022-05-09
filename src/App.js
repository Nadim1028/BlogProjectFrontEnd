
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AllStoriesPage from "./pages/AllStoriesPage";
import RegisterUserPage from './pages/RegisterUserPage';
import LoginUserPage from './pages/LoginUserPage';
import { useContext, useEffect } from "react";
import AuthContext from './auth/AuthContext';
import NewStoryPage from './pages/NewStoryPage';
import SearchPage from './pages/SearchPage';
import ProtectedRoutes from './auth/ProtectedRoutes';
import MyStoriesPage from './pages/MyStoriesPage';

function App() {

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    if (userName && token) {
      console.log("token......", authCtx);
      authCtx.addCredentials({
        userId: userId,
        userName: userName,
        token: token,
      });
    }
  }, [authCtx]);

  return (
    <Layout>
      <Routes>
          <Route path="/" element={<AllStoriesPage/>} />
          <Route path="/register" element={<RegisterUserPage/>} />
          <Route path="/login" element={<LoginUserPage/>} />

          <Route element={<ProtectedRoutes />}>
          <Route path="/new-story" element={<NewStoryPage />} />
          <Route path="/my-story" element={<MyStoriesPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
  </Layout>
  );
}

export default App;
