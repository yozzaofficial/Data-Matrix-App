"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

type Props = {
    path: string;
    iconClicked: StaticImageData;
    icon: StaticImageData;
    name: string;
};

export default function NavButtons({ path, iconClicked, icon, name }: Props) {

    const pathname = usePathname();

    const isActive = pathname === path.split("?")[0];

    return (
        <div className={`navButton ${isActive ? "active" : ""}`}>
            <Link href={path}>
                <div className="icon">
                    <Image
                        src={isActive ? iconClicked : icon}
                        alt={name}
                        width={45}
                        height={45}
                    />
                </div>
                <span>{name}</span>
            </Link>
        </div>
    );
}