import React, { useRef } from "react";
import VehicleChart from "../Chart/VehicleChart";
import PieChart from "../Chart/DonutChart";
import LineChart from "../Chart/FinancialChart";
import ProfitChart from "../Chart/ProfitChart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoDownload } from "react-icons/io5";
import CumulativeCashFlowChart from "../Chart/CashFlowChart";

const Display_Report = () => {
  const reportRef = useRef(); // Reference to the report section

  // Function to handle the PDF generation and download with dynamic height
  const handleDownloadPDF = async () => {
    const report = reportRef.current;

    // Use html2canvas to capture the element with the dark background
    const canvas = await html2canvas(report, {
      backgroundColor: "#222831", // Set background color to match your design
      scale: 2, // Optional: increase the scale for higher quality
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210; // A4 page width in mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Dynamic height

    // Set the PDF page size based on the content height
    pdf.internal.pageSize.setHeight(pdfHeight);

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("report.pdf");
  };

  return (
    <div className="h-full flex flex-col px-4 py-6">
      {/* Button to download the report as PDF */}
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Report</h1>
        <div className="relative group">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-[#B1B500] text-white rounded-lg p-2 pl-4 transition-all duration-300 ease-in-out group-hover:px-4"
          >
            <span className="flex justify-center items-center">
              <IoDownload size={20} />
            </span>
            <span className="font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 group-hover:max-w-xs">
              Download Report PDF
            </span>
          </button>
        </div>
      </div>

      {/* Report content that will be downloaded */}
      <div
        ref={reportRef}
        className="h-full grid grid-cols-5 grid-rows-6 gap-2 overflow-auto mt-4"
        style={{ height: "calc(100vh - 56px)" }} // Subtracting height of button or header
      >
        {/* Daily Financial Chart Section */}
        <div className="col-span-5 row-span-2 bg-[#22283177] border-[1.5px] border-[#222831] rounded overflow-hidden">
          <CumulativeCashFlowChart />
        </div>

        {/* Pie Chart Section */}
        <div className="col-span-2 row-span-4 bg-[#22283177] border-[1.5px] border-[#222831] rounded overflow-hidden">
          <LineChart />
        </div>

        {/* Profit Chart Section */}
        <div className="col-span-3 row-span-2 bg-[#22283177] border-[1.5px] border-[#222831] rounded overflow-hidden">
          <ProfitChart />
        </div>

        {/* Vehicle Chart Section */}
        <div className="col-span-3 row-span-2 bg-[#22283177] border-[1.5px] border-[#222831] rounded overflow-hidden">
          <VehicleChart />
        </div>
      </div>
    </div>
  );
};

export default Display_Report;
