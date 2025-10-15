import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="auth-layout">
            {/* Outlet */}
            <Outlet />
        </div>
    )
}

export default AuthLayout;