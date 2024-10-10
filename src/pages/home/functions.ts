import { Auth, Unsubscribe, UserCredential, createUserWithEmailAndPassword } from "@firebase/auth";
import { CollectionReference, DocumentReference, Firestore, QuerySnapshot, WhereFilterOp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "@firebase/firestore";
import { FirebaseStorage, StorageReference, deleteObject, getDownloadURL, listAll, ref, uploadBytes, uploadBytesResumable } from "@firebase/storage";
import { firestore } from "../../apis/firebase/firebase";
import { listenToCollectionChanges } from "../../shared/functions/database";

const checkLoggedIn = (auth: import("@firebase/auth").Auth): boolean => {
    try {
        const currentUser = auth.currentUser;
        return !!currentUser;
    } catch (error) {
        throw (error)
    }
}

const fetchFromCollection = async (firestore: Firestore, collectionName: string, docRef?: DocumentReference): Promise<Array<any>> => {
    try {
        let colRef = collection(firestore, collectionName);
        if (docRef != null) {
            colRef = collection(firestore, docRef.path + "/" + collectionName);
        }
        const snapshot = await getDocs(colRef);
        const data: Array<any> = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching collection: ", error);
        throw error;
    }
}

const fetchFromCollectionFiltered = async (firestore: Firestore, collectionName: string, filters: Array<{ field: string, operator: WhereFilterOp, value: any }>, docRef?: DocumentReference): Promise<Array<any>> => {
    try {
        let colRef = collection(firestore, collectionName);
        if (docRef != null) {
            colRef = collection(firestore, docRef.path + "/" + collectionName);
        }
        let q = query(colRef);
        filters.forEach(filter => {
            q = query(q, where(filter.field, filter.operator, filter.value));
        });
        const snapshot = await getDocs(q);
        const data: Array<any> = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error("Error fetching filtered collection: ", error);
        throw error;
    }
}

const listenToFilteredCollectionChanges = (firestore: Firestore, collectionName: string, filters: Array<{ field: string, operator: WhereFilterOp, value: any }>, callback: (data: Array<Object>) => void, docRef?: DocumentReference): Unsubscribe => {
    try {
        let colRef = collection(firestore, collectionName);
        if (docRef != null) {
            colRef = collection(firestore, docRef.path + "/" + collectionName);
        }
        let q = query(colRef);
        filters.forEach(filter => {
            q = query(q, where(filter.field, filter.operator, filter.value));
        });
        return onSnapshot(q, (snapshot) => {
            const data: Array<Object> = [];
            snapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data(), ref: doc.ref });
            });
            callback(data);
        }, error => {
            console.error("Error listening to filtered collection changes: ", error);
        });
    } catch (error) {
        console.error("Error setting up filtered listener: ", error);
        throw error;
    }
}



const filterMapListByValue = (list: Array<Map<String, any>>, keyword: string, matchType: 'exact' | 'includes'): Array<Map<String, any>> => {
    try {
        if (!Array.isArray(list) || !list.every(item => item instanceof Map || typeof item === 'object')) {
            throw new Error("Input list must be an array of Map<string, any> or objects");
        }

        const searchInMap = (map: Map<String, any> | object, keyword: string, matchType: 'exact' | 'includes'): boolean => {
            if(map == null){
                return false;
            }
            const mapObj = new Map(Object.entries(map));
            const lowerCaseKeyword = keyword.toLowerCase();
            return Array.from(mapObj.entries()).some(([key, val]) => {
                if (key === 'id') return false;
                if (key === 'timestamp') return false;
                if (key === 'ref') return false;
                if (val instanceof Map || typeof val === 'object') {
                    return searchInMap(val, lowerCaseKeyword, matchType);
                }
                const valStr = val.toString().toLowerCase();
                return matchType === 'exact' ? valStr === lowerCaseKeyword : valStr.includes(lowerCaseKeyword);
            });
        };
        return list.filter(map => searchInMap(map, keyword, matchType));
    } catch (error) {
        throw error;
    }
}

const registerUser = async (auth: Auth, email: any, password: string): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error("Error registering user: ", error);
        throw error;
    }
}

const saveData = async (firestore: Firestore, collectionName: string, data: Map<string, any> | object, docRef?: DocumentReference, docId?: string): Promise<void> => {
    try {
        let colRef = collection(firestore, collectionName);
        if (docRef != null) {
            colRef = collection(firestore, docRef.path + "/" + collectionName);
        }
        const dataObj = data instanceof Map ? Object.fromEntries(data) : data;
        if (docId != null) {
            const docRef = doc(colRef, docId);
            await setDoc(docRef, dataObj);
        } else {
            await addDoc(colRef, dataObj);
        }
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error;
    }
}

const deleteData = async (firestore: Firestore, collectionName: string, docId: string, docRef?: DocumentReference): Promise<void> => {
    try {
        let colRef = collection(firestore, collectionName);
        if (docRef != null) {
            colRef = collection(firestore, docRef.path + "/" + collectionName);
        }
        const documentRef = doc(colRef, docId);
        await deleteDoc(documentRef);
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error;
    }
}

const updateDocument = async (firestore: Firestore, docRef: DocumentReference, data: Map<string, any> | Object): Promise<void> => {
    try {
        let dataObj = data instanceof Map ? Object.fromEntries(data) : data; // Convert Map to object
        dataObj = Object.fromEntries(Object.entries(dataObj).filter(([key, value]) => value !== undefined)); // Remove fields with undefined values
        await updateDoc(docRef, dataObj);
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
}
const uploadImage = async (storage: FirebaseStorage, image: File, path: string): Promise<[path: string, url: string]> => {
    try {
        const imageRef = ref(storage, path);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        return [imageRef.fullPath, downloadURL];
    } catch (error) {
        throw error;
    }
}

const uploadImageWithProgress = async (storage: FirebaseStorage, image: File, path: string, progressCallback: (progress: number) => void): Promise<[path: string, url: string]> => {
    try {
        const imageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(imageRef, image);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressCallback(progress);
            }, 
            (error) => {
                throw error;
            }
        );

        await uploadTask;
        const downloadURL = await getDownloadURL(imageRef);
        return [imageRef.fullPath, downloadURL];
    } catch (error) {
        throw error;
    }
}
const getAllImages = async (storage: FirebaseStorage, path: string): Promise<[string[], StorageReference[]]> => {
    try {
        const listRef = ref(storage, path);
        const res = await listAll(listRef);
        const urls = await Promise.all(res.items.map(itemRef => getDownloadURL(itemRef)));
        const refs = res.items.map(itemRef => itemRef);
        return [urls, refs];
    } catch (error) {
        throw error;
    }
}

const deleteImageRef = async (storage: FirebaseStorage, path: string): Promise<void> => {
    try {
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
    } catch (error) {
        console.error("Error deleting image: ", error);
        throw error;
    }
}


const uploadURIImage = async (storage: FirebaseStorage, imageDataUrl: string, path: string): Promise<[path: string, url: string]> => {
    try {
        const imageRef = ref(storage, path);
        const response = await fetch(imageDataUrl);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        return [imageRef.fullPath, downloadURL];
    } catch (error) {
        throw error;
    }
}

const uploadURIImageWithProgress = async (storage: FirebaseStorage, imageDataUrl: string, path: string, progressCallback: (progress: number) => void): Promise<[path: string, url: string]> => {
    try {
        const imageRef = ref(storage, path);
        const response = await fetch(imageDataUrl);
        const blob = await response.blob();
        const uploadTask = uploadBytesResumable(imageRef, blob);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressCallback(progress);
            }, 
            (error) => {
                throw error;
            }
        );

        await uploadTask;
        const downloadURL = await getDownloadURL(imageRef);
        return [imageRef.fullPath, downloadURL];
    } catch (error) {
        throw error;
    }
}

const getUID = (auth: Auth): string => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error("User is not authenticated or UID is not available");
    }
    return uid;
}

const checkExistWithinFields = async (colRef: CollectionReference, searchCriteria: Array<{ field: string, value: string }>): Promise<[boolean, QuerySnapshot]> => {
    const queries = searchCriteria.map(criteria => where(criteria.field, '==', criteria.value));
    const q = query(colRef, ...queries);
    const snapshot = await getDocs(q);
    return [snapshot.size > 0, snapshot];
}

const generateCode = (length: number, prefix: string): string => {
    const code = prefix + Math.random().toString(36).substring(2, length + 2);
    return code;
}

const getDocRefByField = async (firestore: Firestore, colName: string, fieldName: string, fieldValue: any): Promise<DocumentReference> => {
    const colRef = collection(firestore, colName);
    const q = query(colRef, where(fieldName, '==', fieldValue));
    const snapshot = await getDocs(q);
    if(snapshot.docs.length == 0){
        throw new Error("Document not found");
    }
    return snapshot.docs[0].ref;
}
const addToCollection = async(root: Firestore | DocumentReference, colName: string, data: Map<string, any> | Object): Promise<DocumentReference> => {
    let colRef : CollectionReference;
    if (root instanceof Firestore) {
        colRef = collection(root, colName);
    } else {
        colRef = collection(root, colName);
    }
    const dataObj = data instanceof Map ? Object.fromEntries(data) : data; // Convert Map to object
    return await addDoc(colRef, dataObj);
}

const getOrganizationDocRef = async(credential: Auth | string, firestore: Firestore): Promise<DocumentReference> => {
    const uid = typeof credential === 'string' ? credential : getUID(credential);
    const orgRef = await getDocRefByField(firestore, 'organizations', 'lead_uid', uid);
    return orgRef;
}
export { 
    checkLoggedIn, 
    fetchFromCollection, 
    listenToCollectionChanges, 
    filterMapListByValue, 
    registerUser, 
    saveData, 
    getUID, 
    checkExistWithinFields, 
    updateDocument, 
    uploadImage, 
    generateCode, 
    getDocRefByField, 
    addToCollection,
    getOrganizationDocRef,
    listenToFilteredCollectionChanges,
    uploadURIImage,
    getAllImages,
    deleteImageRef,
    uploadImageWithProgress,
    uploadURIImageWithProgress,
    deleteData,
    fetchFromCollectionFiltered
}
