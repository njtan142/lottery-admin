import { signInWithEmailAndPassword } from "@firebase/auth";
import { UserCredential } from "@firebase/auth";
import { Auth } from "@firebase/auth";
import { ROLES } from "../../settings/constants";

const authenticateUser = async (auth: Auth, email: string, password: string) : Promise<UserCredential> => {
    try {
        const userCredential : UserCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
}

const checkUserPrivilege = async (data: Object | Map<string, any>, requiredPrivilege: ROLES) : Promise<boolean> => {
    try {
        if (!data['privilege'] || !data['privilege'][requiredPrivilege]) {
            throw new Error(`User does not have the required ${requiredPrivilege} privilege`);
        }
        return true;
    } catch (error) {
        throw error;
    }
}





export { authenticateUser, checkUserPrivilege };
