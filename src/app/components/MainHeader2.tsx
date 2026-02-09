"use client"
import iconLogout from "./../../../public/icon/logoutIcon.png"
import iconLogoutClicked from "./../../../public/icon/logoutIconClicked.png"
import iconProfile from "./../../../public/icon//iconProfile.png"
import iconProfileClicked from "./../../../public/icon//iconProfileClicked.png"
import Image from "next/image"


export default function MainHeader2() {
    return <>
        <header className="mainHeader2">
            <nav className="headerNav2">
                <div className="buttonsNav2"><Image src={iconProfile} alt="Icon profile" width={40} height={40}></Image></div>
                <div className="buttonsNav2"><Image src={iconLogout} alt="Icon logout" width={40} height={40}></Image></div>
            </nav>
        </header>
    </>
}