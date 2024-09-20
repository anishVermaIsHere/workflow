"use strict";
import { lazy } from "react";


const HomePage=lazy(()=>import("../pages/HomePage"));
const WorkflowPage=lazy(()=>import("../pages/WorkflowPage"));
const Protected = lazy(()=>import("../components/Protected"));
const Error404Page = lazy(()=>import("../pages/Error404"));


export {
    HomePage,
    WorkflowPage,
    Protected,
    Error404Page
}
