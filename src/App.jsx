import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// Components:
import Nav from "./Components/Nav/Nav";
import AudioPlayer from "./Components/Players/AudioPlayer/AudioPlayer";
// Pages:
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const AhadithPage = React.lazy(() => import("./Pages/AhadithPage"));
const VersesSavedPage = React.lazy(() => import("./Pages/VersesSavedPage"));
// Contexts Providers:
import { TafsirModalContextProvider } from "./Context/TafsirModalContext";
import { AudioPlayerContextProvider } from "./Context/AudioPlayerContext";
import { NavContextProvider } from "./Context/NavContext";
// Contexts:
import { useSettings } from "./Context/SettingsContext";

function App() {

  const { lastChapterId } = useSettings();

  return (
    <TafsirModalContextProvider>
      <NavContextProvider>
        <AudioPlayerContextProvider>
          <div className="App bg-body-bg-color min-h-screen">
            {/* Nav */}
            <Nav />
            {/* Routes */}
            <Suspense fallback={<div className="text-center py-10">جاري التحميل...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to={`/home/${lastChapterId}`} replace />} />
                <Route path="/home/:chapterId" element={<HomePage />} />
                <Route path="/ahadith" element={<AhadithPage />} />
                <Route path="/verses-saved" element={<VersesSavedPage />} />
              </Routes>
            </Suspense>
          </div>
          {/* Audio Player */}
          <AudioPlayer />
        </AudioPlayerContextProvider>
      </NavContextProvider>
    </TafsirModalContextProvider>
  )
}

export default App;