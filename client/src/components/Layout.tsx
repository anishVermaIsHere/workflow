import { ReactNode } from "react"
import Header from "./Header"
import Sidebar from "./sidebar/Sidebar"

const Layout = ({ children }: { children: ReactNode}) => {
  return (
    <div className="flex">
    <Sidebar />
      <div className="bg-teal-50 w-full h-screen">
        <Header />
        {children}
      </div>        
    </div>
  )
}

export default Layout