"use client"
import { useSearchParams } from "next/navigation";
import ListItem from "../components/reportComponents/ListItem";
import "./../css/report.css"
import ScanPage from "../components/reportComponents/ScanPage";
import React from "react";
import { useClickAway } from "ahooks";

export default function ReportPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [isOpen, setIsOpen] = React.useState(false);

  const clickAwayRef = React.useRef(null);
  useClickAway(() => {
    setIsOpen(false);
  }, clickAwayRef);

  return (<main className="reportPage">
    {mode === "scan" ?
      <ScanPage isOpen={isOpen} setIsOpen={setIsOpen} clickAwayRef={clickAwayRef} />
      : <ListItem isOpen={isOpen} setIsOpen={setIsOpen} clickAwayRef={clickAwayRef} />}
  </main>
  );
}