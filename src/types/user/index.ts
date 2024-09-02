import { Base } from "..";

export interface Partner {
    profileId: number;
    profileType: string;
    phone: string;
    verifiedPhone: string;
    email: string;
    username: string;
    name: string;
    register: string;
    partnerId: number;
    hasAccountPin: boolean;
}

export interface LoginResult {
    token: string;
    partner: Partner;
}
