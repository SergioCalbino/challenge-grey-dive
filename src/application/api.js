import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where } from "firebase/firestore";
import { db } from './firebase';


export const saveData = async (obj) => {
   
        const colRef = collection(db, 'items');
        const data = await addDoc(colRef, obj);
        return data.id;
    

}