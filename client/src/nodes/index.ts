"use strict";
import type { NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode } from "./types";


export const nodeStyle={
  bgColor: "#a4edf5",
  padding: "0.33rem",
  darkBgColor: "#424242"
};

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Start" },
    style: {
      backgroundColor: nodeStyle.darkBgColor,
      color: "#fff",
      padding: nodeStyle.padding
    }
  },
  {
    id: "b",
    // type: 'textUpdater',
    position: { x: 0, y: 80 },
    data: { label: "Filter Data" },
    style: {
      backgroundColor: nodeStyle.bgColor,
      padding: nodeStyle.padding
    }
  },
  {
    id: "c",
    type: 'default',
    position: { x: 0, y: 160 },
    data: { label: "Wait" },
    style: {
      backgroundColor: nodeStyle.bgColor,
      padding: nodeStyle.padding
    }
  },
  {
    id: "d",
    type: 'default',
    position: { x: 0, y: 240 },
    data: { label: "Convert Format" },
    style: {
      backgroundColor: nodeStyle.bgColor,
      padding: nodeStyle.padding
    }
  },
  {
    id: "e",
    type: "default",
    position: { x: 0, y: 320 },
    data: { label: "Send POST Request" },
    style: {
      backgroundColor: nodeStyle.bgColor,
      padding: nodeStyle.padding
    }
  },
  {
    id: "f",
    type: "output",
    position: { x: 0, y: 400 },
    data: { label: "End" },
    style: {
      backgroundColor: nodeStyle.darkBgColor,
      color: "#fff",
      padding: nodeStyle.padding
    }
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
