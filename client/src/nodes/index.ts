"use strict";
import type { NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode } from "./types";
import { layoutStyle } from "../utils/styles";


export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Start" },
    style: {
      backgroundColor: layoutStyle.darkBgColor,
      color: "#fff",
      padding: layoutStyle.padding
    }
  },
  {
    id: "b",
    // type: 'textUpdater',
    position: { x: 0, y: 80 },
    data: { label: "Filter Data" },
    style: {
      backgroundColor: layoutStyle.bgColor,
      padding: layoutStyle.padding
    }
  },
  {
    id: "c",
    type: 'default',
    position: { x: 0, y: 160 },
    data: { label: "Wait" },
    style: {
      backgroundColor: layoutStyle.bgColor,
      padding: layoutStyle.padding
    }
  },
  {
    id: "d",
    type: 'default',
    position: { x: 0, y: 240 },
    data: { label: "Convert Format" },
    style: {
      backgroundColor: layoutStyle.bgColor,
      padding: layoutStyle.padding
    }
  },
  {
    id: "e",
    type: "default",
    position: { x: 0, y: 320 },
    data: { label: "Send POST Request" },
    style: {
      backgroundColor: layoutStyle.bgColor,
      padding: layoutStyle.padding
    }
  },
  {
    id: "f",
    type: "output",
    position: { x: 0, y: 400 },
    data: { label: "End" },
    style: {
      backgroundColor: layoutStyle.darkBgColor,
      color: "#fff",
      padding: layoutStyle.padding
    }
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
