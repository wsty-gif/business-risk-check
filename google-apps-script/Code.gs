const SHEET_NAME = "診断回答";
const ADMIN_EMAIL = "";

function doPost(e) {
  try {
    const payload = JSON.parse(e.parameter.payload || "{}");
    const sheet = getOrCreateSheet_();
    const diagnosis = payload.diagnosis || {};
    const breakdown = diagnosis.breakdown || [];
    const answers = diagnosis.answers || [];

    sheet.appendRow([
      new Date(),
      payload.name || "",
      payload.email || "",
      payload.message || "",
      diagnosis.companySize || "",
      diagnosis.employeeEstimate || "",
      diagnosis.totalLossMan || "",
      diagnosis.resultTitle || "",
      (diagnosis.topIssues || []).join("\n"),
      breakdown.map((item) => `${item.label}: ${item.amountMan}万円`).join("\n"),
      answers.map((item) => `${item.question}: ${item.answer}`).join("\n"),
      payload.pageUrl || "",
    ]);

    if (payload.email) {
      sendAutoReply_(payload);
    }

    if (ADMIN_EMAIL) {
      sendAdminNotice_(payload);
    }

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "送信日時",
      "お名前",
      "メールアドレス",
      "相談内容",
      "従業員規模",
      "推定従業員数",
      "年間損失額（万円）",
      "診断結果",
      "主な原因",
      "損失額の内訳",
      "設問回答",
      "ページURL",
    ]);
  }

  return sheet;
}

function sendAutoReply_(payload) {
  const diagnosis = payload.diagnosis || {};
  const breakdown = diagnosis.breakdown || [];
  const topIssues = diagnosis.topIssues || [];
  const name = payload.name || "ご担当者";

  const subject = "【TOACH】無料業務診断のお申し込みありがとうございます";
  const body = `${name} 様

無料業務診断にお申し込みいただき、ありがとうございます。
以下の内容で受け付けました。

■ 診断結果
${diagnosis.resultTitle || ""}

■ 年間損失額の目安
約${diagnosis.totalLossMan || 0}万円

■ 従業員規模
${diagnosis.companySize || ""}

■ 主な原因
${topIssues.map((item) => `・${item}`).join("\n")}

■ 年間損失額の内訳
${breakdown.map((item) => `・${item.label}: ${item.amountMan}万円`).join("\n")}

担当者より、診断結果をもとにご連絡いたします。
TOACHでは、マニュアル作成・タスク管理・教育定着確認・多言語対応を一元化し、現場の教育負担と属人化による損失削減を支援します。

株式会社TETOTE / TOACH
`;

  MailApp.sendEmail({
    to: payload.email,
    subject,
    body,
    name: "TOACH",
  });
}

function sendAdminNotice_(payload) {
  const diagnosis = payload.diagnosis || {};
  const subject = "【TOACH診断】新しい無料業務診断の申し込み";
  const body = `新しい申し込みがありました。

お名前: ${payload.name || ""}
メール: ${payload.email || ""}
相談内容:
${payload.message || ""}

年間損失額の目安: 約${diagnosis.totalLossMan || 0}万円
診断結果: ${diagnosis.resultTitle || ""}
従業員規模: ${diagnosis.companySize || ""}
`;

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject,
    body,
    name: "TOACH診断フォーム",
  });
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
