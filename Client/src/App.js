import Home from './pages/Home'
import PageLogin from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRegister from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" caseSensitive={false} element={<PageLogin />} />
          <Route path="/PageRegister" caseSensitive={false} element={<PageRegister />} />
          <Route path="/Home" caseSensitive={false} element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
