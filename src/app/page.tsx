
'use client';
import React, { useContext } from 'react';
import { useLocale } from 'next-intl';
import IctContext from '@/context/ict-context';

export default function LocalePage() {
    const { partner } = useContext(IctContext);
    const locale = useLocale();

    return (
        <div>
            vdbvndk -- {locale}--- {partner?.email}
        </div>
    );
}


// "use client";
// import * as React from "react";
// import { GlobalUserStore } from "@/contexts";
// import { useRouter } from "next/navigation";
// import authService from "@/services/auth";
// import { checkPermission } from "@/utils";
// import { adminRoleName, menus } from "@/constants";
// import { Resource } from "@/types/enums";
// import LoadingPage from "@/components/Loading";

// const Home = () => {
//     const [{ auth, authorized }] = GlobalUserStore();
//     const router = useRouter();

//     React.useEffect(() => {
//         if (!authService.hasToken()) {
//             router.push("/auth/login");
//         } else if (auth?.role?.name === adminRoleName) {
//             router.push(menus.dashboard);
//         }
//     }, [authorized, auth]);
//     return (
//         <React.Fragment>
//             <LoadingPage />
//         </React.Fragment>
//     );
// };
// export default Home;
