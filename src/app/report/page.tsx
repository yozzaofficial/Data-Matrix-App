"use client"
import { useSearchParams } from "next/navigation";
import ListItem from "../components/reportComponents/ListItem";
import "./../css/report.css"
import ScanPage from "../components/reportComponents/ScanPage";

export default function ReportPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");



  return (<main className="reportPage">
    {mode === "scan" ?
      <ScanPage />
      : <ListItem />}
  </main>
  );
}