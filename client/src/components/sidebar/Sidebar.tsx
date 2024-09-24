
import { IoArrowBackCircle, IoArrowForwardCircle, IoCloudUploadSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import useCommonStore from '../../store/common.store';
import WorkList from "./WorkList";
import Node from './Node';


const Sidebar = () => {
  const { sidebarToggle, setSidebarToggle }=useCommonStore(state=>state);

  const handleSidebar=()=>{
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <>
    <aside className={`bg-white border-r rounded-md shadow-lg transition-all duration-300 min-w-[250px] h-screen ${sidebarToggle ? `md:static`: `fixed bottom-0`} top-0 z-[999] ${sidebarToggle ? `left-0`:`left-[-250px]`}`}>
      <div className='relative flex items-center justify-between cursor-pointer'>
        <h5 className="p-2 font-semibold bg-gray-700 text-white w-full">Workflow</h5>
        <div onClick={handleSidebar} className={`flex items-center bg-gray-700 text-white rounded-r-full transition-all duration-300  p-1 absolute z-[9999] left-[248px] cursor-pointer`}>
        {sidebarToggle ? <IoArrowBackCircle className='w-8 h-8'/> : <IoArrowForwardCircle className='w-8 h-8'/>}
      </div>
      </div>

      <div className="bg-white h-[calc(100vh-40px)] overflow-auto">
        <div className={`relative px-2 ${sidebarToggle ? `block`: `hidden`}`}>
          <div className=''>
            <button className='flex items-center justify-center px-2 py-1 my-2 text-center rounded bg-teal-700 text-white w-full'>
              <IoMdAdd className='me-1'/> New
            </button>
          </div>
          <div className=''>
            <button className='flex items-center justify-center px-2 py-1 my-2 text-center rounded bg-gray-700 text-white w-full'>
              <IoCloudUploadSharp className='me-1'/> Upload data
            </button>
          </div>
          <hr className='mt-4'/>

          <div className="">
            <WorkList />
            <hr className='mt-4'/>
            <div className=''>
              <p className="py-2 font-semibold">Nodes</p>
              <div className="">
                <Node type='input' label='Start'/>
                <Node type='default' label='Filter Data'/>
                <Node type='default' label='Wait'/>
                <Node type='default' label='Convert Format'/>
                <Node type='default' label='Send POST Request'/>
                <Node type='output' label='End'/>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
      
      
    </aside>
    </>
  );
};

export default Sidebar;