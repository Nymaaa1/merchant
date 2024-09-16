"use client";

import React, { useState, ReactNode } from 'react';
import jsCookie from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { Branch, Partner } from '@/types/user';
import { BalanceResult } from '@/types/user/balance';
import authBranchService from '@/service/branch';
import authService from '@/service/api';
import { BranchBalance } from '@/types/branch';

interface IctContextProps {
    userRole: "branch" | "partner" | "";
    branch: Branch;
    partner: Partner;
    loginType: string;
    branchBalance: BranchBalance;
    partnerBalance: BalanceResult;
    cardIndex: number;
    passwordRecoverOTP: string;
    transferInfo: TransferProps;
    setUserRole: (val: "branch" | "partner" | "") => void;
    setLoginType: (val: string) => void;
    setPartner: (val: Partner) => void;
    setLogout: () => void;
    setUserInfo: (val: any) => void;
    setTransferInfo: (val: TransferProps) => void;
    setPasswordRecoverOTP: (val: string) => void;
    setPartnerBalance: (val: BalanceResult) => void;
    setCardIndex: (val: number) => void;
    setBranch: (val: Branch) => void;
    setBranchBalance: (val: BranchBalance) => void;
}

const IctContext = React.createContext<IctContextProps>({
    branch: { name: "", profileId: 0, phone: "", username: "", accountIdMerch: 0, branchType: '', branchId: 0, hasPinCode: false },
    partner: { profileId: 0, profileType: "", phone: "", verifiedPhone: "", email: "", username: "", name: "", register: "", partnerId: 0, hasAccountPin: false, },
    cardIndex: 0,
    userRole: "",
    partnerBalance: { totalBalance: 0, balanceList: [] },
    passwordRecoverOTP: "",
    transferInfo: { type: "", title: '', bank: { description: "", bankAccount: "", bankName: "", amount: "", accountName: "", sourceAccountNo: "" }, monpay: { phoneNumber: "", userName: "", amount: "", description: "" }, merchant: { phoneNumber: "", userName: "", amount: "", description: "" } },
    branchBalance: {
        accountNo: "",
        ibanAccount: "",
        accountId: 0,
        balance: 0,
        balanceDate: "",
        journal: {
            id: 0,
            transactionId: 0,
            transactionNo: "",
            date: "",
            transactionType: "",
            amount: 0,
            balance: 0,
            balanceOld: 0,
            accountNo: "",
            accountId: 0,
            deviceType: "",
            deviceValue: "",
            coopAccountNo: "",
            coopAccountId: 0,
            coopDeviceType: "",
            coopDeviceValue: "",
            coopProfileId: 0,
            coopAccountName: "",
            coopBranchName: "",
            branchName: "",
            description: "",
            channel: "",
            branchId: 0,
            accountName: ""
        }
    },
    loginType: "creater",
    setLoginType: () => { },
    setPartner: () => { },
    setPasswordRecoverOTP: () => { },
    setLogout: () => { },
    setUserInfo: () => { },
    setTransferInfo: () => { },
    setPartnerBalance: () => { },
    setCardIndex: () => { },
    setBranch: () => { },
    setUserRole: () => { },
    setBranchBalance: () => { },
});

interface IctProviderProps {
    children: ReactNode;
}

export const IctProvider: React.FC<IctProviderProps> = (props) => {
    const [userRole, setUserRole] = useState<"branch" | "partner" | "">("");
    const [loginType, setLoginType] = useState<string>("");
    const [partner, setPartner] = useState<Partner>({ profileId: 0, profileType: "", phone: "", verifiedPhone: "", email: "", username: "", name: "", register: "", partnerId: 0, hasAccountPin: false, },);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [transferInfo, setTransferInfo] = useState<TransferProps>({ type: "", title: '', bank: { description: "", bankAccount: "", bankName: "", amount: "", accountName: "", sourceAccountNo: "" }, monpay: { phoneNumber: "", userName: "", amount: "", description: "" }, merchant: { phoneNumber: "", userName: "", amount: "", description: "" } });
    const [passwordRecoverOTP, setPasswordRecoverOTP] = useState<string>("");
    const [partnerBalance, setPartnerBalance] = useState<BalanceResult>({ totalBalance: 0, balanceList: [] });
    const [branch, setBranch] = useState<Branch>({ name: "", profileId: 0, phone: "", username: "", accountIdMerch: 0, branchType: '', branchId: 0, hasPinCode: false });
    const [branchBalance, setBranchBalance] = useState<BranchBalance>({
        accountNo: "",
        ibanAccount: "",
        accountId: 0,
        balance: 0,
        balanceDate: "",
        journal: {
            id: 0,
            transactionId: 0,
            transactionNo: "",
            date: "",
            transactionType: "",
            amount: 0,
            balance: 0,
            balanceOld: 0,
            accountNo: "",
            accountId: 0,
            deviceType: "",
            deviceValue: "",
            coopAccountNo: "",
            coopAccountId: 0,
            coopDeviceType: "",
            coopDeviceValue: "",
            coopProfileId: 0,
            coopAccountName: "",
            coopBranchName: "",
            branchName: "",
            description: "",
            channel: "",
            branchId: 0,
            accountName: ""
        }
    });
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        const partnerToken = localStorage.getItem('partnerToken');
        const partnerData = localStorage.getItem('partner');
        const branchToken = localStorage.getItem("branchToken");
        const branchData = localStorage.getItem("branch");
        const branchRole = localStorage.getItem("branchRole");
        const partnerRole = localStorage.getItem("partnerRole");

        if (pathname?.match("/(app)/")) {
            if (partnerData && partnerToken && partnerRole) {
                setUserRole("partner");
                setPartner(JSON.parse(partnerData));
                authService.setPartner(partnerData, partnerToken);
            } else if (branchToken && branchData && branchRole) {
                authBranchService.setBranch(branchData, branchToken);
                setBranch(JSON.parse(branchData));
                router.push("/branch/dashboard")
                setUserRole("branch");
            } else {
                router.push("/auth/login");
            }
        } else if (pathname?.match("/(branch)/")) {
            if (partnerData && partnerToken && partnerRole) {
                setUserRole("partner");
                setPartner(JSON.parse(partnerData));
                authService.setPartner(partnerData, partnerToken);
                router.push("/app/dashboard");
            } else if (branchToken && branchData && branchRole) {
                authBranchService.setBranch(branchData, branchToken);
                setBranch(JSON.parse(branchData));
                setUserRole("branch");
            } else {
                router.push("/auth/login");
            }
        } else if (pathname?.match('(login|new|forgot-password|success|request)')) {
            if (partnerData && partnerToken && partnerRole) {
                router.push("/app/dashboard");
            } else if (branchToken && branchData && branchRole) {
                router.push("/branch/dashboard");
            }
        } else if (pathname === "/") {
            if (partnerData && partnerToken && partnerRole) {
                setUserRole("partner");
                setPartner(JSON.parse(partnerData));
                authService.setPartner(partnerData, partnerToken);
                router.push("/app/dashboard");
            } else if (branchToken && branchData && branchRole) {
                authBranchService.setBranch(branchData, branchToken);
                setBranch(JSON.parse(branchData));
                setUserRole("branch");
                router.push("/branch/dashboard");
            } else {
                router.push("/auth/login");
                setLogout();
            }
        }
    }, [pathname]);

    const setUserInfo = (val: any) => {
        const now = new Date();
        val.lastUpdated = now.getTime();
    };

    const setLogout = () => {
        setPartner({ profileId: 0, profileType: "", phone: "", verifiedPhone: "", email: "", username: "", name: "", register: "", partnerId: 0, hasAccountPin: false, },);
        setBranch({ name: "", profileId: 0, phone: "", username: "", accountIdMerch: 0, branchType: '', branchId: 0, hasPinCode: false });
        // setCardIndex(0);
        setLoginType("creater");
        clear();
        setUserRole("");
        router.push('/auth/login');
    };

    const clear = () => {
        localStorage.removeItem('branchToken');
        localStorage.removeItem('branch');
        localStorage.removeItem("partner");
        localStorage.removeItem("partnerRole");
        localStorage.removeItem("partner");
        localStorage.removeItem("branchRole");
        jsCookie.remove('partnerToken');
        jsCookie.remove('partner');
        jsCookie.remove('branch');
        jsCookie.remove('branchToken');
    };

    return (
        <IctContext.Provider
            value={{
                partner,
                loginType,
                branchBalance,
                userRole,
                branch,
                partnerBalance,
                passwordRecoverOTP,
                transferInfo,
                cardIndex,
                setUserRole,
                setLoginType,
                setBranchBalance,
                setBranch,
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
