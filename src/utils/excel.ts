import * as XLSX from "xlsx";

export interface TotalRow {
  name: string;
  value: any;
}
export function excelDownload(data: any, name: string, totals?: TotalRow[]) {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  if (totals) {
    const footer = totals.map((item) => [item.name, item.value]);
    XLSX.utils.sheet_add_aoa(worksheet, footer, {
      origin: -1,
    });
  }
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const fileUrl = URL.createObjectURL(excelBlob);
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = `monpay.xlsx`; 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(fileUrl);
}
