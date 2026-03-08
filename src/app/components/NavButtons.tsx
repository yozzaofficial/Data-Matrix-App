"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useSearchParams, usePathname } from "next/navigation";

type Props = {
    path: string;
    iconClicked: StaticImageData;
    icon: StaticImageData;
    name: string;
};

export default function NavButtons({ path, iconClicked, icon, name }: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Controllo se il pulsante è attivo
    const isActive = (() => {
        if (path.includes("?")) {
            const [basePath, query] = path.split("?");
            const params = new URLSearchParams(query);

            return pathname === basePath &&
                Array.from(params.entries()).every(([key, value]) =>
                    searchParams.get(key) === value
                );
        }

        return pathname === path;
    })();

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
