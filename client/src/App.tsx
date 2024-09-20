import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { AxiosInterceptor } from "./shared/services/AxiosInterceptor";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <AxiosInterceptor>
        <ReactFlowProvider>
          <Header />
          <AppRoutes />
          <Toaster />
        </ReactFlowProvider>
      </AxiosInterceptor>
    </Router>
  );
}
