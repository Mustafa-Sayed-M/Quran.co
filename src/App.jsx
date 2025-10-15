import { Navigate, Route, Routes } from "react-router-dom";
import useStopAllTransition from "@hooks/useStopAllTransition";

// ## Pages:
import HomePage from "@pages/HomePage";
import NotFoundPage from "@pages/NotFoundPage";
// ## Components:
import Footer from "@components/layout/Footer";
// ## Layouts:
import MainLayout from "@layouts/MainLayout";
import AuthLayout from "@layouts/AuthLayout";
import BookmarkPage from "@pages/BookmarkPage";

function App() {

  useStopAllTransition();

  return (
    <div className='App text-slate-800'>
      {/* Routes */}
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="bookmark" element={<BookmarkPage />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/" element={<AuthLayout />} >
          <Route path="auth">
            <Route index element={<Navigate to={'/auth/login'} replace />} />
            <Route path="login" element={<>Login Page</>} />
            <Route path="signup" element={<>Signup Page</>} />
            <Route path="forget-password" element={<>Forget Password Page</>} />
            <Route path="reset-password" element={<>Reset Password Page</>} />
            <Route path="verify-email" element={<>Verify Email Page</>} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  )
}

export default App;