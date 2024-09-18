import { v4 as uuidv4 } from "uuid";

export const getUID = () => uuidv4().split("-").slice(-1)[0];
