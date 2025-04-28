import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import ServerPage from "./pages/serverPage";
function App() {
  return (
    <body className="bg-gray-700 w-full h-screen text-zinc-200 ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/server/:guildId" element={<ServerPage />} />
      </Routes>
    </body>
  );
}

export default App;
