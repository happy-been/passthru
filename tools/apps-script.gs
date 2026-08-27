// 패스루 사전신청 수집 — Google Apps Script
// 시트 열 구성: 시각 | 유형 | 이름/기관 | 학교·도서관 | 이메일 | 문의내용
const SECRET = "passthru-2026"; // 내려받기용 비밀키 (원하면 변경)

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["시각", "유형", "이름/기관", "학교·도서관", "이메일", "문의내용"]);
  }
  sheet.appendRow([
    new Date(),
    d.type === "student" ? "학생 사전신청" : "파일럿 문의",
    d.name || d.org || "",
    d.univ || "",
    d.email || "",
    d.note || ""
  ]);
  return ContentService.createTextOutput("ok");
}

// 브라우저로 열면 전체 응답을 CSV로 반환 (로컬 엑셀 저장용)
function doGet(e) {
  if (!e.parameter.key || e.parameter.key !== SECRET) {
    return ContentService.createTextOutput("forbidden");
  }
  const rows = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getDataRange().getValues();
  const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(",")).join("\n");
  return ContentService.createTextOutput("﻿" + csv).setMimeType(ContentService.MimeType.CSV);
}
