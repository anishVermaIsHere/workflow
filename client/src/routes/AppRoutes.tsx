import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Error404Page, HomePage, Protected, WorkflowListPage, WorkflowPage, WorkflowUploadPage } from './LazyComponent';
import Spinner from '../components/Spinner';

const AppRoutes = () => {
  return (
    <main>
        <Routes>
          <Route element={<Suspense fallback={<Spinner />}><Protected /></Suspense>}>
            <Route path="/" element={<Suspense fallback={<Spinner />}><HomePage /></Suspense>} />
            <Route path="/user/workflow" element={<Suspense fallback={<Spinner />}><WorkflowListPage /></Suspense>} />
            <Route path="/user/workflow/:id" element={<Suspense fallback={<Spinner />}><WorkflowPage /></Suspense>} />
            <Route path="/user/workflow/upload" element={<Suspense fallback={<Spinner />}><WorkflowUploadPage /></Suspense>} />
          </Route>
          <Route path="*" element={<Suspense fallback={<Spinner />}><Error404Page /></Suspense>} />
        </Routes>
    </main>
  )
}

export default AppRoutes