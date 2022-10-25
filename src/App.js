import { Route, Routes, BrowserRouter } from "react-router-dom";
import { TvShowsProvider } from "./context/TvShows";
import { UserProvider } from "./context/UserContext";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";

const App = () => {
  return (
    <UserProvider>
      <TvShowsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </TvShowsProvider>
    </UserProvider>
  );
};

export default App;
