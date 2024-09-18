import { ReactFlowProvider } from "@xyflow/react";
import Header from "./components/Header";
import "@xyflow/react/dist/style.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <ReactFlowProvider>
      <Header />
      <AppRoutes />
      <Toaster />
    </ReactFlowProvider>
  );
}
