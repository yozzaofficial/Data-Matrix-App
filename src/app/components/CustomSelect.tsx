"use client";
import React from "react";
import "./../css/customSelect.css";
type CustomSelectProps = {
  width: number;
  height: number;
  optionsValues: string[];
  defaultSelectValue: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
  selectValue: string | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  clickAwayRef?: React.RefObject<null>;
};

export default function CustomSelect({
  width,
  height,
  optionsValues,
  defaultSelectValue,
  setSelectValue,
  selectValue,
  isOpen,
  setIsOpen,
  clickAwayRef,
}: CustomSelectProps) {
  const selectRef = React.useRef<HTMLUListElement>(null);

  const useIsMobile = () => {
    const [screenWidth, setScreenWidth] = React.useState(
      typeof window !== "undefined" ? window.innerWidth : 0,
    );
    React.useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return screenWidth;
  };

  const isMobile = useIsMobile();

  let propsStyle: React.CSSProperties;
  if (isMobile < 400) {
    propsStyle = {
      width: "170px",
      height: "30px",
      "--option-height": "30px",
    } as React.CSSProperties;
  } else if (isMobile < 450) {
    propsStyle = {
      width: "200px",
      height: "30px",
      "--option-height": "30px",
    } as React.CSSProperties;
  } else if (isMobile < 550) {
    propsStyle = {
      width: "250px",
      height: "40px",
      "--option-height": "34px",
    } as React.CSSProperties;
  } else if (isMobile < 650) {
    propsStyle = {
      width: "300px",
      height: "50px",
      "--option-height": "36px",
    } as React.CSSProperties;
  } else {
    propsStyle = {
      width: `${width}px`,
      height: `${height}px`,
      "--option-height": `${height}px`,
    } as React.CSSProperties;
  }
  function setOptionsValue(value: string) {
    setIsOpen(false);
    setSelectValue(value);
  }
  React.useEffect(() => {
    const el = selectRef.current;
    if (!el) return;

    if (isOpen) {
      const scrollHeight = el.scrollHeight;
      el.style.setProperty("--target-height", `${scrollHeight}px`);
    } else {
      const scrollHeight = el.scrollHeight;
      el.style.setProperty("--target-height", `${scrollHeight}px`);
    }
  }, [isOpen]);

  const liElements = optionsValues.map((v) => {
    return (
      <li
        ref={clickAwayRef}
        key={v}
        style={propsStyle}
        onClick={(e) => {
          e.stopPropagation();
          setOptionsValue(v == "" ? defaultSelectValue : v);
        }}
      >
        {v}
      </li>
    );
  });

  return (
    <>
      <div
        ref={clickAwayRef}
        style={propsStyle}
        className={
          isOpen
            ? "selectCurrentValue borderRadiusSelect"
            : "selectCurrentValue"
        }
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectValue}
        <ul
          className={
            isOpen ? "customSelect showOptions" : "customSelect hideOptions"
          }
          ref={selectRef}
        >
          {liElements}
        </ul>
      </div>
    </>
  );
}
