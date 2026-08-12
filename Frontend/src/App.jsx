import AppRoutes from "./routes/AppRouts";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
