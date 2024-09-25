"use client";
import * as React from "react";
import Loading from "@/components/loading";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import IctContext from "@/context/ict-context";
// import authService from "@/service/api";
// import authBranchService from "@/service/branch";

const Home = () => {
    // const router = useRouter();
    // const pathname = usePathname();
    // const { setLogout, partner, branch, userRole } = React.useContext(IctContext);

    // React.useEffect(() => {
    //     console.log("rendered=====")
    //     if (!authService.hasToken()) {
    //         console.log("no token")
    //         // setLogout();
    //         router.push("/auth/login");
    //     } else if (pathname?.match("/(app)/")) {
    //         if (partner && userRole === "partner") {
    //             // const data = JSON.parse(partnerData)
    //             // setUserRole("partner");
    //             // balanceAction.run(data.profileId);
    //             // recentAction.run(data.profileId, params);
    //             // setPartner(JSON.parse(partnerData));
    //             // authService.setPartner(partnerData, partnerToken);
    //             router.push("/app/dashboard");
    //         } else if (branch && userRole === "branch") {
    //             // authBranchService.setBranch(branchData, branchToken);
    //             // setBranch(JSON.parse(branchData));
    //             router.push("/branch/dashboard");
    //             // setUserRole("branch");
    //         } else {
    //             console.log("no partner")
    //             router.push("/auth/login");
    //         }
    //     }
    //     // } else if (pathname?.match("/(branch)/")) {
    //     //     if (partnerData && partnerToken && partnerRole) {
    //     //         setUserRole("partner");
    //     //         setPartner(JSON.parse(partnerData));
    //     //         authService.setPartner(partnerData, partnerToken);
    //     //         router.push("/app/dashboard");
    //     //     } else if (branchToken && branchData && branchRole) {
    //     //         authBranchService.setBranch(branchData, branchToken);
    //     //         setBranch(JSON.parse(branchData));
    //     //         setUserRole("branch");
    //     //     } else {
    //     //         router.push("/auth/login");
    //     //     }
    //     // } else if (pathname?.match('(login|new|forgot-password|success|request)')) {
    //     //     if (partnerData && partnerToken && partnerRole) {
    //     //         router.push("/app/dashboard");
    //     //     } else if (branchToken && branchData && branchRole) {
    //     //         router.push("/branch/dashboard");
    //     //     }
    //     else if (pathname === "/") {
    //         console.log("blank")

    //         // alert(pathname + "---" + JSON.stringify(partner) + "---" + !authService.hasToken() + "---" + userRole)
    //         if (partner && !authService.hasToken() && userRole === "partner") {
    //             router.push("/app/dashboard");
    //         } else if (branch && !authBranchService.hasBranchToken() && userRole === "branch") {
    //             router.push("/branch/dashboard");
    //         } else {
    //             console.log(partner);
    //             console.log(authService.hasToken());
    //             console.log(userRole);
    //             router.push("/auth/login");
    //             // setLogout();
    //         }
    //     }else {
    //         console.log("no user")
    //     }
    // }, [partner, userRole]);

    return (
        <React.Fragment>
            <Loading />
        </React.Fragment>
    );
};
export default Home;

