"use client";

import Link from "next/link";
import Image, { StaticImageData } from 'next/image';

type props = {
    pathname: string,
    iconClicked: StaticImageData,
    icon: StaticImageData,
    path: string,
    name: string
}
export default function NavButtons({ pathname, iconClicked, icon, path, name }: props) {

    return <>
        <div className="navButton">
            <Link href={path}>
                <div className="icon iconWork">
                    <Image
                        src={pathname === path ? iconClicked : icon}
                        alt="Logo"
                        width={45}
                        height={45}
                    />
                </div>
                {name}
            </Link>
        </div>
    </>
}