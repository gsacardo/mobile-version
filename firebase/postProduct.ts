import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";


export default async function post_base(table_name: any, data: any) {
    let result = null
    let error = null;
    try {
        const docRef = await addDoc(collection(db, table_name), data);
        result = docRef.id
    } catch (e) {
        console.log('ERROR:', e)
        error = e;
    }
    return { result, error };
    
}