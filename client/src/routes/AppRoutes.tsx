import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage, WorkflowPage } from './LazyComponent';
import Spinner from '../components/Spinner';

const AppRoutes = () => {
  return (
    <main>
    <Router>
        <Routes>
            <Route path="/" element={<Suspense fallback={<div><Spinner /></div>}><HomePage /></Suspense>} />
            <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><WorkflowPage /></Suspense>} />
        </Routes>
    </Router>
    </main>
  )
}

export default AppRoutes