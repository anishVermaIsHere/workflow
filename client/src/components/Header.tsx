import { useState } from "react";
import useAuthStore from "../store/auth.store";
import { toastPromise } from "../utils";
import { authAPI } from "../shared/services/api/auth";



const Dropdown=()=>{
  const [toggle, setToggle] = useState(false);
  const { user, clearUser } =  useAuthStore(state=>state);
  const username = user ? `${user.firstName} ${user.lastName}` : 'User';


  const logout=async()=>{
    const res = authAPI.logout();
    toastPromise(res, {
      loading: 'Logging out',
      success: 'Logout successfully',
      error: 'Error when fetching',
    })
    clearUser();
  };


  return <>
  <div>
    <button
    onClick={()=>setToggle(!toggle)}
    className="rounded-lg text-sm text-center inline-flex items-center text-white" type="button">
    <div>
      <img 
      className="h-8 w-8 rounded-full cursor-pointer"
      src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
      alt="profile pic"
      />
    </div>
      <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
      </svg>
    </button>
    
    { toggle && <div className={`absolute right-2 z-10 ${ toggle ? `block` : `hidden` } bg-white text-gray-500 divide-y divide-gray-100 rounded-lg shadow w-44`}>
      <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
        <li className="block font-semibold px-4 py-2">{username}</li>
        <hr />
        
        <li onClick={logout} className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-200 cursor-pointer">
          Log out
        </li>
      </ul>
    </div>}
  </div>
</>

}

const Header = () => {
  const { user } =  useAuthStore(state=>state);
  return (
    <header className="bg-gray-700 p-2">
      <nav className="relative flex justify-between items-center">
        <h2 className="text-lg text-white">Workflow builder</h2>
        { user.accessToken && <Dropdown /> }
      </nav>
    </header>
  )
};

export default Header;