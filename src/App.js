import React from "react";
import { Route, Routes } from "react-router-dom";
import Aos from "aos";
// Pages:
import Home from "./Pages/Home";
import Chapters from "./Pages/Chapters/Chapters";
import Chapter from "./Pages/Chapters/Chapter/Chapter";
import Reciter from "./Pages/Reciter";
import Ahadis from "./Pages/Ahadis";
// Components:
import Navbar from "./Components/Navbar/Navbar";
import Player from "./Components/Player/Player";
// Context:
import { SidebarContextProvider } from "./Context/SidebarContext";
import { SettingsContextProvider } from "./Context/SettingsContext";
import { AudioPlayerContextProvider } from "./Context/AudioPlayerContext";
import { NavbarContextProvider } from "./Context/NavbarContext";

function App() {

  React.useEffect(() => { // Initialize AOS:
    Aos.init({
      easing: 'ease-in-out-sine',
      once: true,
    });
  }, []);

  return (
    <NavbarContextProvider>
      <SettingsContextProvider>
        <AudioPlayerContextProvider>
          <SidebarContextProvider>
            <div className="App min-h-screen bg-body-color text-white">
              {/* Navbar */}
              <Navbar />
              {/* Routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chapters" element={<Chapters />} />
                <Route path="/chapters/:chapterId" element={<Chapter />} />
                <Route path="/reciter/:reciterId" element={<Reciter />} />
                <Route path="/ahadis/:ahadisId" element={<Ahadis />} />
              </Routes>
              {/* Player */}
              <Player />
            </div>
          </SidebarContextProvider>
        </AudioPlayerContextProvider>
      </SettingsContextProvider>
    </NavbarContextProvider>
  );
}

export default App;