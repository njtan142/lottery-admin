export enum ROLES {
    ADMIN = `admin`,
    USER = `user`,
}


export enum VIEWMODE{
    ORG_LEAD_FOCUSED = `orgLeadFocused`,
    ADMIN_FOCUSED = `adminFocused`,
    STAFF_FOCUSED = `staffFocused`,
    DEFAULT = `default`,
}


//#region USER AUTHORITY MANAGEMENT

export enum AUTHORITIES {
    ORGANIZATION = `organization`,
    EVENTS = `events`,
    TEAMS = `teams`,
}

export enum ACTIONS {
    VIEW = `canView`,
    EDIT = `canEdit`,
    ADD = `canAdd`,
    AUTHORIZED = `authorized`,
}

export enum ORGANIZATION_AUTHORITIES {
    DASHBOARD = `dashboard`,
    GENERAL = `general`,
    PHOTOS = `photos`,
    TEAM = `team`,
}

export enum ORGANIZATION_DASHBOARD_AUTHORITIES {
    PROFILE_PREVIEW = `profilePreview`,
}

export enum EVENT_AUTHORITIES {
    MANAGEMENT = `management`,
}

export enum TEAM_AUTHORITIES {
    MANAGEMENT = `management`,
}

export function getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((accumulator, key) => {
        return accumulator && accumulator[key] !== undefined ? accumulator[key] : undefined;
    }, obj);
}

export const convertCamelCaseToTitleCase = (str: string): string => {
    // console.log(str)
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

//#endregion
