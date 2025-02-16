"use client";

import React, { useState } from "react";
import SubmitButton from "@/app/components/Button/SubmitButton"; // assuming this is in the same folder
import { request } from "@/app/lib/datocms"; // make sure to import the request function
import {
  CompanyProfileDocument,
  type SiteLocale,
} from "@/app/graphql/types/graphql";

const DownloadSection: React.FC<{
  locale: SiteLocale;
  fallbackLocale: SiteLocale;
}> = ({ locale, fallbackLocale }) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleDownload = async () => {
    setStatus("loading");
    try {
      const result = await request(CompanyProfileDocument, {
        locale: locale,
        fallbackLocale: fallbackLocale,
      });

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      const fileExtension = result.upload?.filename.split(".").pop(); // Get the file extension (e.g., "pdf")
      const baseFilename = result.upload?.filename.replace(
        `.${fileExtension}`,
        ""
      ); // Remove the file extension from the original filename
      const newFilename = `${baseFilename}_${formattedDate}.${fileExtension}`; // Append the date to the filename

      // Fetch the file data
      const response = await fetch(result.upload?.url || "");
      if (!response.ok) {
        throw new Error("Failed to fetch file.");
      }

      const blob = await response.blob();

      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Use a Blob URL to trigger the download
      link.download = newFilename;
      link.target = "_blank"; // Open in new tab for safety (optional)
      link.click();

      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error fetching the PDF:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="my-4">
      <h2>Download PDF</h2>
      <SubmitButton status={status} onClick={handleDownload}>
        Tải xuống thông tin
      </SubmitButton>
    </div>
  );
};

export default DownloadSection;
