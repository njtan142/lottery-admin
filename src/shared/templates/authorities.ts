import {
    ACTIONS,
    AUTHORITIES,
    EVENT_AUTHORITIES,
    ORGANIZATION_AUTHORITIES,
    TEAM_AUTHORITIES,
    convertCamelCaseToTitleCase,
    ORGANIZATION_DASHBOARD_AUTHORITIES
} from "../../settings/constants";

export const defaultAuthorities = {
    [AUTHORITIES.ORGANIZATION]: {
        [ACTIONS.AUTHORIZED]: true,
        [ORGANIZATION_AUTHORITIES.DASHBOARD]: {
            [ACTIONS.AUTHORIZED]: true,
            [ORGANIZATION_DASHBOARD_AUTHORITIES.PROFILE_PREVIEW]: {
                [ACTIONS.EDIT]: false,
                [ACTIONS.VIEW]: true
            }
        },
        [ORGANIZATION_AUTHORITIES.GENERAL]: {
            [ACTIONS.AUTHORIZED]: true,
            [ACTIONS.EDIT]: false,
        },
        [ORGANIZATION_AUTHORITIES.PHOTOS]: {
            [ACTIONS.AUTHORIZED]: true,
            [ACTIONS.EDIT]: false,
            [ACTIONS.VIEW]: true,
            [ACTIONS.ADD]: false,
        },
        [ORGANIZATION_AUTHORITIES.TEAM]: {
            [ACTIONS.AUTHORIZED]: true,
            [ACTIONS.EDIT]: false,
            [ACTIONS.VIEW]: true,
            [ACTIONS.ADD]: false,
        }
    },
    [AUTHORITIES.EVENTS]: {
        [ACTIONS.AUTHORIZED]: true,
        [EVENT_AUTHORITIES.MANAGEMENT]: {
            [ACTIONS.EDIT]: false,
            [ACTIONS.VIEW]: true,
            [ACTIONS.ADD]: false,
        }
    },
    [AUTHORITIES.TEAMS]: {
        [ACTIONS.AUTHORIZED]: true,
        [TEAM_AUTHORITIES.MANAGEMENT]: {
            [ACTIONS.EDIT]: false,
            [ACTIONS.VIEW]: true,
            [ACTIONS.ADD]: false,
        }
    }
}

export const authoritiesTemplate = [
    {
        type: AUTHORITIES.ORGANIZATION,
        label: convertCamelCaseToTitleCase(AUTHORITIES.ORGANIZATION),
        subAuthorities: [
            {
                type: ORGANIZATION_AUTHORITIES.DASHBOARD,
                label: convertCamelCaseToTitleCase(ORGANIZATION_AUTHORITIES.DASHBOARD),
                subAuthorities: Object.values(ORGANIZATION_DASHBOARD_AUTHORITIES).map(
                    (authority) => ({
                        type: authority,
                        label: convertCamelCaseToTitleCase(authority)
                    })
                )
            },
            {
                type: ORGANIZATION_AUTHORITIES.GENERAL,
                label: convertCamelCaseToTitleCase(ORGANIZATION_AUTHORITIES.GENERAL)
            },
            {
                type: ORGANIZATION_AUTHORITIES.PHOTOS,
                label: convertCamelCaseToTitleCase(ORGANIZATION_AUTHORITIES.PHOTOS),

            },
            {
                type: ORGANIZATION_AUTHORITIES.TEAM,
                label: convertCamelCaseToTitleCase(ORGANIZATION_AUTHORITIES.TEAM),
            }
        ]
    },
    {
        type: AUTHORITIES.EVENTS,
        label: convertCamelCaseToTitleCase(AUTHORITIES.EVENTS),
        subAuthorities: Object.values(EVENT_AUTHORITIES).map(
            (authority) => ({
                type: authority,
                label: convertCamelCaseToTitleCase(authority)
            })
        )
    },
    {
        type: AUTHORITIES.TEAMS,
        label: convertCamelCaseToTitleCase(AUTHORITIES.TEAMS),
        subAuthorities: Object.values(TEAM_AUTHORITIES).map(
            (authority) => ({
                type: authority,
                label: convertCamelCaseToTitleCase(authority)
            })
        )
    }
];
