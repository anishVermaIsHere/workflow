import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { AxiosInterceptor } from "./shared/services/AxiosInterceptor";
import { BrowserRouter as Router } from "react-router-dom";
import QueryProvider from "./shared/QueryProvider";

export default function App() {
  return (
    <Router>
      <AxiosInterceptor>
        <QueryProvider>
        <ReactFlowProvider>
          <AppRoutes />
          <Toaster />
        </ReactFlowProvider>
        </QueryProvider>
      </AxiosInterceptor>
    </Router>
  );
}
