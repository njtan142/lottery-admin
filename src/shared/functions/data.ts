import { ROLES } from "../../settings/constants";
const checkMultipleUserPrivileges = async (data: Object | Map<string, any>, requiredPrivileges: Array<ROLES>) : Promise<Array<boolean>> => {
    try {
        if (!data['privilege']) {
            throw new Error(`User does not have any privileges`);
        }
        const privileges = requiredPrivileges.map(privilege => !!data['privilege'][privilege]);
        if (privileges.every(privilege => !privilege)) {
            throw new Error(`User does not have any of the required privileges: ${requiredPrivileges.join(', ')}`);
        }
        return privileges;
    } catch (error) {
        throw error;
    }
}


export { checkMultipleUserPrivileges };