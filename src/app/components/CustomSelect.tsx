"use client"
import React from "react";
import "./../css/customSelect.css"
type CustomSelectProps = {
    width: number,
    height: number,
    optionsValues: string[],
    defaultSelectValue: string,
    setSelectValue: React.Dispatch<React.SetStateAction<string>>,
    selectValue: string | undefined,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    isOpen:boolean,
    clickAwayRef?: React.RefObject<null>
}   

export default function CustomSelect({ width, height, optionsValues, defaultSelectValue, setSelectValue, selectValue,isOpen, setIsOpen,clickAwayRef }: CustomSelectProps) {
    const selectRef = React.useRef<HTMLUListElement>(null);
    const propsStyle = {
        width: `${width}px`,
        height: `${height}px`,
        "--option-height": `${height}px`,
    };

    function setOptionsValue(value: string) {
        setIsOpen(false)
        setSelectValue(value)

    }
    React.useEffect(() => {
        const el = selectRef.current;
        if (!el) return;

        if (isOpen) {
            const scrollHeight = el.scrollHeight;
            el.style.setProperty("--target-height", `${scrollHeight}px`);
        }
        else {
            const scrollHeight = el.scrollHeight;
            el.style.setProperty("--target-height", `${scrollHeight}px`);
        }
    }, [isOpen]);

    const liElements = optionsValues.map((v) => {
        return <li ref={clickAwayRef} key={v} style={propsStyle} onClick={(e) => { e.stopPropagation(); setOptionsValue(v == "" ? defaultSelectValue : v) }}>{v}</li>
    })

    return <>
        <div  ref={clickAwayRef} style={propsStyle} className={isOpen ? "selectCurrentValue borderRadiusSelect" : "selectCurrentValue"} onClick={() => setIsOpen(prev => !prev)}>{selectValue}
            <ul  className={isOpen ? "customSelect showOptions" : "customSelect hideOptions"} ref={selectRef}>
                {liElements}

            </ul>
        </div>
    </>
}