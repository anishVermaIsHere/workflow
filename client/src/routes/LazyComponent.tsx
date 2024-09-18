
import { lazy } from "react";


const HomePage=lazy(()=>import("../pages/HomePage"));
const WorkflowPage=lazy(()=>import("../pages/WorkflowPage"));



export {
    HomePage,
    WorkflowPage
}
