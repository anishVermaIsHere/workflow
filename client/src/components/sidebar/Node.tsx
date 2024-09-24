import { DragEvent } from "react";
import { CustomNodeType } from "../../nodes/types";
import { layoutStyle } from "../../utils/styles";
import useWorkFlowStore from "../../store/workflow.store";


const startEndlayoutStyle = {
  backgroundColor: layoutStyle.darkBgColor,
  color: "#fff",
};

const defaultStyle={
    backgroundColor: layoutStyle.bgColor,
}

type NodeProps={
    label: string,
    type: CustomNodeType
}

const Node = ({ label, type }: NodeProps) => {
  const { setType } = useWorkFlowStore((state) => state);
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: CustomNodeType,
    label: string
  ) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("label", label);
    setType(nodeType);
  };

  return (
    <div
      className={`px-2 py-1 my-1 text-center rounded`}
      style={ type === 'input' || type === 'output' ? startEndlayoutStyle : defaultStyle}
      onDragStart={(event) => onDragStart(event, type, label)}
      draggable
    >
      {label}
    </div>
  );
};

export default Node;
