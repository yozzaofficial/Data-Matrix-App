"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import "./css/layout.css";

import iconWork from "./../../public/icon/maintance.png";
import iconWorkClicked from "./../../public/icon/maintanceClicked.png";
import iconDone from "./../../public/icon/maintanceDone.png";
import iconDoneClicked from "./../../public/icon/maintanceDoneClicked.png";
import iconNewWork from "./../../public/icon/newWork.png";
import iconNewWorkClicked from "./../../public/icon/newWorkClicked.png";
import iconUserSettings from "./../../public/icon/userSetting.png";
import iconUserSettingsClicked from "./../../public/icon/userSettingClicked.png";
import NavButtons from "./components/NavButtons";
import MainHeader2 from "./components/MainHeader2";
export default function ClientLayout({
    userRank,
    children,
}: {
    userRank: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';



    return (
        <>
            {!isLoginPage && <MainHeader2 />}
            {!isLoginPage && (
                <header className="mainHeader">
                    <nav>
                        <NavButtons iconClicked={iconWorkClicked} icon={iconWork} path="/todo?filter=emergency" name="To do"></NavButtons>
                        <NavButtons iconClicked={iconDoneClicked} icon={iconDone} path="/done" name="Work Done"></NavButtons>
                        {userRank === "admin" && <NavButtons iconClicked={iconNewWorkClicked} icon={iconNewWork} path="/new" name="Handle Work"></NavButtons>}
                        {userRank === "admin" && <NavButtons iconClicked={iconUserSettingsClicked} icon={iconUserSettings} path="/user-settings" name="User Settings"></NavButtons>}
                    </nav>
                </header>
            )}

            {children}
        </>
    );
}
