"use client"
import iconLogout from "./../../../public/icon/logoutIcon.png"
import iconLogoutClicked from "./../../../public/icon/logoutIconClicked.png"
import iconProfile from "./../../../public/icon//iconProfile.png"
import iconProfileClicked from "./../../../public/icon//iconProfileClicked.png"
import Image from "next/image"
import getRank from "./getRank"
import React from "react"

export default function MainHeader2() {
    //const rank = await getRank()
    const [openUser, setOpenUser] = React.useState(false)
    const rank = "user"
    return <>
        <header className="mainHeader2">
            <nav className="headerNav2">
                <div
                    className="buttonsNav2"
                    onClick={() => setOpenUser(prev => !prev)}
                ><Image src={iconProfile} alt="Icon profile" width={40} height={40}></Image>
                    {openUser && <div className="profileSection"><div className="profileTriangle"></div><p>Logged In As:</p>{rank === "user" ? "Technician" : "Admin"}</div>}
                </div>
                <div className="buttonsNav2"><Image src={iconLogout} alt="Icon logout" width={40} height={40}></Image></div>
            </nav>
        </header>
    </>
}