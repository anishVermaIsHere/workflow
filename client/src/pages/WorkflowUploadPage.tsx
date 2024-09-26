import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import { IoCloudUploadSharp } from 'react-icons/io5'
import useWorkFlowStore from '../store/workflow.store'
import { WorkflowType } from '../shared/types'
import { workflowAPI } from '../shared/services/api/workflow'
import toast from 'react-hot-toast'




const WorkflowUploadPage = () => {

    const { workflowList } = useWorkFlowStore(state=>state);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formValues, setFormValues]= useState<{
        columns: string[],
        rows: string[],
        workflowId: string
    }>({
        columns: [],
        rows: [],
        workflowId: ''
    });

    const [fileName, setFileName] = useState('');
    const [disabled, setDisabled] = useState(true);

    const validateFields=()=>{
        if(formValues.columns && formValues.rows && formValues.workflowId){
            return true;
        } 
        return false;
    }

    const handleFileInput=()=>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    };

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files ? e.target.files[0] : null;
        if(file){
            const reader = new FileReader();
            setFileName(file.name);
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if(event.target){
                    const text= event.target.result as string;
                    const { columns, rows } = csvToRowsAndCols(text);

                    setFormValues({
                        ...formValues,
                        columns,
                        rows
                    });
                }
            }

            reader.readAsText(file);
        }
        
    };

    const handleWorkflowChange=(event: ChangeEvent<HTMLSelectElement>)=>{
        setFormValues({
            ...formValues,
            workflowId: event.target.value
        });
    }

    const handleSubmit=async(e: FormEvent)=>{
        e.preventDefault();
        if(validateFields()){
           const res = await workflowAPI.execution(formValues);
           if(res.status === 200){
            toast.success('Workflow run successfully');
           }
        }
        else {
           toast.error("Upload CSV file and then select the workflow")
        }        
    };

    const csvToRowsAndCols = (csvText: string) => {
        const columns = csvText.slice(0, csvText.indexOf("\r\n")).split(",");
        const rows = csvText.slice(csvText.indexOf("\r\n") + 2).split("\r\n");
        return { columns, rows }
      };

    useEffect(()=>{
        if(validateFields()){
            setDisabled(!disabled);
        }
        return ()=> setDisabled(true);
    }, [formValues]);

  return (
   <Layout>
        <div className='px-2 py-4 h-screen'>
            <div className=''>
                <h4 className='text-center p-2 text-xl'>Upload data and run workflow</h4>
            <form className="" onSubmit={handleSubmit}>
               <div className='flex flex-col justify-center items-center border-4 border-dashed border-gray-400 rounded-xl bg-gray-100 min-h-[400px] w-full md:w-1/2 lg:1/3 mx-auto mb-8'>
                    <div className='cursor-pointer' onClick={handleFileInput}>
                        <IoCloudUploadSharp className='w-20 h-20 text-gray-500'/>
                    </div>
                    <div className='text-lg text-gray-500 font-semibold'>{fileName}</div>
                    <p className='mt-8 text-gray-500'>Upload .csv files</p>
                        <input type='file' ref={fileInputRef} accept='.csv' onChange={handleChange} title='upload workflow' className='hidden'/>
                </div>

                <div className='max-w-sm mx-auto'>
                    <div className="flex mb-8">
                        <button id="states-button" data-dropdown-toggle="dropdown-states" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100" type="button">
                            Workflows
                        </button>
                        <div id="dropdown-states" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                            <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <div className="inline-flex items-center">
                                <svg aria-hidden="true" className="h-3.5 w-3.5 rounded-full me-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us" viewBox="0 0 512 512"><g fillRule="evenodd"><g strokeWidth="1pt"><path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)" /><path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)" /></g><path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" /><path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z" transform="scale(3.9385)" /></g></svg>              
                                United States
                                </div>
                            </button>
                            </li>
                            <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <div className="inline-flex items-center">
                                <svg aria-hidden="true" className="h-3.5 w-3.5 rounded-full me-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 512 512"><path fill="#ffce00" d="M0 341.3h512V512H0z" /><path d="M0 0h512v170.7H0z" /><path fill="#d00" d="M0 170.7h512v170.6H0z" /></svg>
                                Germany
                                </div>
                            </button>
                            </li>
                            <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                                <div className="inline-flex items-center">
                                <svg aria-hidden="true" className="h-3.5 w-3.5 rounded-full me-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-it" viewBox="0 0 512 512"><g fillRule="evenodd" strokeWidth="1pt"><path fill="#fff" d="M0 0h512v512H0z" /><path fill="#009246" d="M0 0h170.7v512H0z" /><path fill="#ce2b37" d="M341.3 0H512v512H341.3z" /></g></svg>              
                                Italy
                                </div>
                            </button>
                            </li>
                            <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <div className="inline-flex items-center">
                                <svg aria-hidden="true" className="h-3.5 w-3.5 rounded-full me-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="flag-icon-css-cn" viewBox="0 0 512 512"><defs><path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z" /></defs><path fill="#de2910" d="M0 0h512v512H0z" /><use width={30} height={20} transform="matrix(76.8 0 0 76.8 128 128)" xlinkHref="#a" /><use width={30} height={20} transform="rotate(-121 142.6 -47) scale(25.5827)" xlinkHref="#a" /><use width={30} height={20} transform="rotate(-98.1 198 -82) scale(25.6)" xlinkHref="#a" /><use width={30} height={20} transform="rotate(-74 272.4 -114) scale(25.6137)" xlinkHref="#a" /><use width={30} height={20} transform="matrix(16 -19.968 19.968 16 256 230.4)" xlinkHref="#a" /></svg>
                                China
                                </div>
                            </button>
                            </li>
                        </ul>
                        </div>
                        <label htmlFor="states" className="sr-only">Choose a workflow</label>
                        <select 
                            title="workflow list"
                            value={formValues.workflowId}
                            onChange={handleWorkflowChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 border-s-2 focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 ">
                                <option selected>Choose a workflow</option>
                                {workflowList.map((wf:WorkflowType)=><option key={wf._id} value={wf._id}>{wf.title}</option>)}
                        </select>
                    </div>

                    <button 
                        disabled={disabled} 
                        className={`flex items-center justify-center mx-auto w-1/2 px-6 py-2 my-2 text-center rounded bg-teal-700 ${ disabled ? `opacity-40`:`opacity-1`} text-white`}
                    >
                        Run workflow 
                    </button>
                </div>
                
            </form>

            </div>

        </div>
   </Layout>
  )
}

export default WorkflowUploadPage