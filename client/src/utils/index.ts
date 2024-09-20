import { v4 as uuidv4 } from "uuid";
import toast, { Renderable, ValueOrFunction } from "react-hot-toast";

type ToastOptions = {
    loading: Renderable;
    success: ValueOrFunction<Renderable, unknown>;
    error: ValueOrFunction<Renderable, any>;
}

const toastPromise=(handler: Promise<unknown>, options: ToastOptions)=>{
    return toast.promise(handler, options);
};

const getUID = () => uuidv4().split("-").slice(-1)[0];

const parsePersistedData = (data: { [key: string]: string }) => {
    const parsedData: { [key: string]: string } = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            try {
                parsedData[key] = JSON.parse(data[key]);
            } catch (e) {
                parsedData[key] = data[key];
            }
        }
    }

    return parsedData;
}


export {
    getUID,
    parsePersistedData,
    toastPromise
}