"use client";

import React, { useEffect, useState, ReactNode } from 'react';
import jsCookie from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { Partner } from '@/types/user';
import { BalanceResult } from '@/types/user/balance';

interface IctContextProps {
    partner: Partner;
    partnerBalance: BalanceResult;
    cardIndex: number;
    alerts: any[];
    passwordRecoverOTP: string;
    transferInfo: TransferProps;
    setPartner: (val: Partner) => void;
    setLogout: () => void;
    setUserInfo: (val: any) => void;
    setTransferInfo: (val: TransferProps) => void;
    setPasswordRecoverOTP: (val: string) => void;
    setPartnerBalance: (val: BalanceResult) => void;
    setCardIndex: (val: number) => void;
}

const IctContext = React.createContext<IctContextProps>({
    partner: { profileId: 0, profileType: "", phone: "", verifiedPhone: "", email: "", username: "", name: "", register: "", partnerId: 0, hasAccountPin: false, },
    cardIndex: 0,
    alerts: [],
    partnerBalance: { totalBalance: 0, balanceList: [] },
    passwordRecoverOTP: "",
    transferInfo: { title: '', bank: { description: "", bankAccount: "", bankName: "", amount: "", accountName: "", sourceAccountNo: "" } },
    setPartner: () => { },
    setPasswordRecoverOTP: () => { },
    setLogout: () => { },
    setUserInfo: () => { },
    setTransferInfo: () => { },
    setPartnerBalance: () => { },
    setCardIndex: () => { }
});

interface IctProviderProps {
    children: ReactNode;
}

export const IctProvider: React.FC<IctProviderProps> = (props) => {
    const [partner, setPartner] = useState<Partner>({ profileId: 0, profileType: "", phone: "", verifiedPhone: "", email: "", username: "", name: "", register: "", partnerId: 0, hasAccountPin: false, },);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [transferInfo, setTransferInfo] = useState<TransferProps>({ title: '', bank: { description: "", bankAccount: "", bankName: "", amount: "", accountName: "", sourceAccountNo: "" } });
    const [passwordRecoverOTP, setPasswordRecoverOTP] = useState<string>("");
    const [partnerBalance, setPartnerBalance] = useState<BalanceResult>({ totalBalance: 0, balanceList: [] });
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const authToken = jsCookie.get('token');
        const userFromStorage = jsCookie.get('partner');
        if (pathname.startsWith("/")) {
            if (pathname.startsWith('/app')) {
                if (!authToken) {
                    setLogout();
                } else {
                    if (!userFromStorage) {
                        setLogout();
                        router.push('/auth/login');
                    } else {
                        // router.push('/app/dashboard');
                        setPartner(JSON.parse(userFromStorage || '{}'));
                    }
                }
            }
            if (pathname == "/") {
                router.push("/app/dashboard")
            }
        } else if (
            pathname?.match('(login|new|forgot-password|)')
        ) {
            if (authToken) return router.push('/app/dashboard');
        }
    }, [cardIndex, pathname]);

    const setUserInfo = (val: any) => {
        const now = new Date();
        val.lastUpdated = now.getTime();
    };

    const setLogout = () => {
        setPartner({ profileId: 0, profileType: "", phone: "", verifiedPhone: "", email: "", username: "", name: "", register: "", partnerId: 0, hasAccountPin: false, },);
        setCardIndex(0);
        clear();
        router.push('/auth/login');
    };

    const clear = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('partner');
        jsCookie.remove('token');
        jsCookie.remove('auth');
        jsCookie.remove('phone');
        jsCookie.remove('passwordToken');
    };

    return (
        <IctContext.Provider
            value={{
                partner,
                partnerBalance,
                passwordRecoverOTP,
                transferInfo,
                cardIndex,
                alerts,
                setPartnerBalance,
                setPasswordRecoverOTP,
                setPartner,
                setTransferInfo,
                setLogout,
                setCardIndex,
                setUserInfo,
            }}
        >
            {props.children}
        </IctContext.Provider>
    );
};

export default IctContext;
