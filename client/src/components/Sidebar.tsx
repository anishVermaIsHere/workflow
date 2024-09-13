
import { nodeStyle } from '../nodes';
import useWorkFlowStore from '../store';


const workFlowNodeStyle=`px-2 py-1 my-2 text-center rounded`;

const startEndNodeStyle={
    backgroundColor: nodeStyle.darkBgColor,
    color: '#fff'
}

const Sidebar = () => {
  const { setType } = useWorkFlowStore(state=>state);

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


  return (
    <aside className='px-5 bg-gray-400 rounded'>
      <h5 className="py-5">Workflow Nodes</h5>
      <div className="flex flex-row md:flex-col justify-stretch flex-wrap">
        <div className={workFlowNodeStyle} style={startEndNodeStyle} onDragStart={(event) => onDragStart(event, 'input')} draggable>
            Start
        </div>
        <div className={workFlowNodeStyle} style={{ background: nodeStyle.bgColor }} onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Filter Data
        </div>
        <div className={workFlowNodeStyle} style={{ background: nodeStyle.bgColor }} onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Wait
        </div>
        <div className={workFlowNodeStyle} style={{ background: nodeStyle.bgColor }} onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Convert Format
        </div>
        <div className={workFlowNodeStyle} style={{ background: nodeStyle.bgColor }} onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Send POST Request
        </div>
        <div className={workFlowNodeStyle} style={startEndNodeStyle} onDragStart={(event) => onDragStart(event, 'output')} draggable>
            End
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;