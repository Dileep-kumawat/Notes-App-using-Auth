import { useEffect } from "react";
import AppRoutes from "./app/AppRoutes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { ThemeProvider } from "./features/shared/context/ThemeContext";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;