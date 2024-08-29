import { CollectionReference, DocumentData, DocumentReference, Firestore, collection, doc, getDoc, onSnapshot } from "firebase/firestore";

const getDocument = async (firestore: Firestore, collection: string | CollectionReference, docId: string) : Promise<Object> => {
    try {
        let docRef : DocumentReference<DocumentData, DocumentData>;
        if (typeof collection === 'string') {
            docRef = doc(firestore, collection, docId);
        } else {
            docRef = doc(collection, docId);
        }
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error("Document does not exist");
        }
        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error("Error getting document: ", error);
        throw error;
    }
}

const listenToCollectionChanges = (firestore: Firestore, collectionName: string, callback: (data: Array<Object>) => void, docRef?: DocumentReference) => {
    try {
        let colRef = collection(firestore, collectionName);
        if (docRef != null) {
            colRef = collection(firestore, docRef.path + "/" + collectionName);
        }
        return onSnapshot(colRef, (snapshot) => {
            const data: Array<Object> = [];
            snapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data() });
            });
            callback(data);
        }, error => {
            console.error("Error listening to collection changes: ", error);
        });
    } catch (error) {
        console.error("Error setting up listener: ", error);
        throw error;
    }
}

export { getDocument, listenToCollectionChanges };