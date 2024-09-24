type AlertProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
};
import { IoMdAlert,IoMdArrowBack  } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const BackButton =() =>{
    const navigate = useNavigate();
    return <button onClick={()=>navigate(-1)} className='flex items-center justify-center px-2 py-1 my-2 text-center rounded bg-gray-700 text-white'>
    <IoMdArrowBack className='me-1'/> Back
</button>
};

const Alert = ({ message, type }: AlertProps) => (
  <div className="flex flex-col items-center justify-center h-screen">
    {type === "info" && (
      <div
      className="flex flex-col md:flex-row justify-between items-center p-4 mb-4 text-md text-gray-800 font-semibold border rounded-lg bg-sky-100 w-full md:w-1/2"
      role="alert"
    >
      <IoMdAlert className="w-10 h-10 me-3 text-sky-500"/>
      {message}
      <BackButton />
    </div>
    )}
    {type === "error" && (
     <div
     className="flex flex-col md:flex-row justify-between items-center p-4 mb-4 text-md text-gray-800 font-semibold border rounded-lg bg-red-100 w-full md:w-1/2"
     role="alert"
   >
     <IoMdAlert className="w-10 h-10 me-3 text-red-500"/>
     {message}
     <BackButton />
   </div>
    )}
    {type === "success" && (
      <div
      className="flex flex-col md:flex-row justify-between items-center p-4 mb-4 text-md text-gray-800 font-semibold border rounded-lg bg-green-100 w-full md:w-1/2"
      role="alert"
    >
      <IoMdAlert className="w-10 h-10 me-3 text-green-500"/>
      {message}
      <BackButton />
    </div>
    )}
    {type === "warning" && (
      <div
        className="flex flex-col md:flex-row justify-between items-center p-4 mb-4 text-md text-gray-800 font-semibold border rounded-lg bg-yellow-100 w-full md:w-1/2"
        role="alert"
      >
        <IoMdAlert className="w-10 h-10 me-3 text-yellow-500"/>
        {message}
        <BackButton />
      </div>
    )}

    
  </div>
);

export default Alert;
