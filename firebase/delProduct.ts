import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default async function delProduct(id: string) {
    try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
    } catch (e) {
        console.log(e)
    }
}