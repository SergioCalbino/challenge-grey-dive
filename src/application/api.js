import { collection, getDocs, query, addDoc } from "firebase/firestore";
import { db } from './firebase'; //


export const saveData = async (obj) => {
   
        const colRef = collection(db, 'items');
        const data = await addDoc(colRef, obj);
        return data.id;
}

export const sendData = async () => {
        const colRef = collection(db, 'items');
        const result = await getDocs(query(colRef));
        return result;
}