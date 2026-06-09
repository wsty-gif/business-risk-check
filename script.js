const questions = [
  {
    type: "companySize",
    text: "会社の従業員数はどれくらいですか？",
    intent: "従業員数に応じて、属人化による年間損失額の規模を補正します。",
    answers: [
      { label: "A", text: "1〜10名", value: 0, employees: 8, sizeLabel: "1〜10名" },
      { label: "B", text: "11〜30名", value: 0, employees: 20, sizeLabel: "11〜30名" },
      { label: "C", text: "31〜100名", value: 0, employees: 60, sizeLabel: "31〜100名" },
      { label: "D", text: "101名以上", value: 0, employees: 130, sizeLabel: "101名以上" },
    ],
  },
  {
    text: "新人が1人前になるまで、どれくらいかかりますか？",
    intent: "教育期間が長いほど、先輩社員の時間コストが増えます。",
    answers: [
      { label: "A", text: "1週間以内", value: 0, educationMonths: 0.25 },
      { label: "B", text: "1か月程度", value: 1, educationMonths: 1 },
      { label: "C", text: "3か月程度", value: 2, educationMonths: 3 },
      { label: "D", text: "半年以上", value: 3, educationMonths: 6 },
    ],
  },
  {
    text: "新人教育に、先輩社員は1日あたり何時間ほど使っていますか？",
    intent: "教育に使っている時間を年間損失額の目安に反映します。",
    answers: [
      { label: "A", text: "30分未満", value: 0, dailyTrainingHours: 0.25 },
      { label: "B", text: "1時間程度", value: 1, dailyTrainingHours: 1 },
      { label: "C", text: "2時間程度", value: 2, dailyTrainingHours: 2 },
      { label: "D", text: "3時間以上", value: 3, dailyTrainingHours: 3 },
    ],
  },
  {
    text: "新人やスタッフから、同じ質問を何回も受けることはありますか？",
    intent: "同じ質問への繰り返し対応は、見えにくい時間損失です。",
    answers: [
      { label: "A", text: "ほとんどない", value: 0, repeatQuestionHours: 0.5 },
      { label: "B", text: "週に数回ある", value: 1, repeatQuestionHours: 2 },
      { label: "C", text: "毎日のようにある", value: 2, repeatQuestionHours: 5 },
      { label: "D", text: "何度も繰り返し聞かれる", value: 3, repeatQuestionHours: 8 },
    ],
  },
  {
    text: "マニュアルは最新状態に更新されていますか？",
    intent: "古いマニュアルや未整備の状態は、確認ロスを生みます。",
    answers: [
      { label: "A", text: "常に更新されている", value: 0, manualLossHours: 0.5 },
      { label: "B", text: "一部だけ更新されている", value: 1, manualLossHours: 2 },
      { label: "C", text: "古い内容が多い", value: 2, manualLossHours: 5 },
      { label: "D", text: "ほぼ存在しない", value: 3, manualLossHours: 9 },
    ],
  },
  {
    text: "ベテラン社員が休むと、対応できない業務はありますか？",
    intent: "特定の人に業務が集中している度合いを確認します。",
    answers: [
      { label: "A", text: "ほとんどない", value: 0, veteranLossHours: 0.5 },
      { label: "B", text: "少しある", value: 1, veteranLossHours: 2 },
      { label: "C", text: "かなりある", value: 2, veteranLossHours: 6 },
      { label: "D", text: "その人がいないと回らない業務がある", value: 3, veteranLossHours: 12 },
    ],
  },
  {
    text: "引継ぎや業務説明に、毎月どれくらい時間を使っていますか？",
    intent: "引継ぎのたびに発生する説明時間を見える化します。",
    answers: [
      { label: "A", text: "1時間未満", value: 0, handoverHours: 0.5 },
      { label: "B", text: "3時間程度", value: 1, handoverHours: 3 },
      { label: "C", text: "5〜10時間程度", value: 2, handoverHours: 8 },
      { label: "D", text: "10時間以上", value: 3, handoverHours: 14 },
    ],
  },
  {
    text: "業務のやり方は、誰でも同じように説明できますか？",
    intent: "説明できる人が少ないほど、属人化リスクは高くなります。",
    answers: [
      { label: "A", text: "誰でも説明できる", value: 0, variationHours: 0.5 },
      { label: "B", text: "一部の人なら説明できる", value: 1, variationHours: 2 },
      { label: "C", text: "担当者しか説明できない業務が多い", value: 2, variationHours: 6 },
      { label: "D", text: "ほぼベテラン社員の頭の中にある", value: 3, variationHours: 12 },
    ],
  },
];

const resultContent = {
  A: {
    title: "属人化リスクは低めです",
    lead: "大きな属人化損失は発生しにくい状態です。ただし、今後の人員増加や退職リスクに備えて、マニュアル整備を進めておくと安心です。",
    futureTitle: "今後に備えておきたいこと",
    future: ["新人教育の標準化", "マニュアル更新の定期化", "担当者以外でも確認できる資料の整備"],
  },
  B: {
    title: "一部の業務で属人化が始まっています",
    lead: "今は大きな問題になっていなくても、新人教育や引継ぎのたびに時間的コストが発生している可能性があります。",
    futureTitle: "放置すると起きやすいこと",
    future: ["新人教育の長期化", "同じ質問への繰り返し対応", "特定社員への確認集中"],
  },
  C: {
    title: "属人化リスクが高い状態です",
    lead: "教育、質問対応、引継ぎ、確認作業に多くの時間が取られている可能性があります。特にベテラン社員の時間が奪われている場合、本来やるべき重要業務に集中できていない可能性があります。",
    futureTitle: "このまま放置すると",
    future: ["ベテラン社員の負担増加", "引継ぎ漏れや確認ミス", "教育品質のばらつき", "改善業務に使える時間の減少"],
  },
  D: {
    title: "属人化がかなり進んでいる可能性があります",
    lead: "特定の人がいないと業務が止まる、新人教育に毎回時間がかかる、同じ説明を何度もしている、マニュアルが整備されていない状態が考えられます。",
    futureTitle: "大きな損失につながる可能性",
    future: ["退職・異動・急な欠勤時に業務が止まる", "教育コストが増え続ける", "引継ぎのたびに現場が混乱する", "ベテラン社員が疲弊する"],
  },
};

const state = {
  current: 0,
  answers: Array(questions.length).fill(null),
};

const hourlyWage = 3000;
const newHireRate = 0.08;
const GOOGLE_APPS_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxlMDcAh7ia47TZvRvfrvcxJ0BPOMTj4AoX_nAoVZrTximgTQPVjac-VLrEEsD1w5In/exec";

const questionCount = document.querySelector("#questionCount");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");
const questionIntent = document.querySelector("#questionIntent");
const questionText = document.querySelector("#questionText");
const answerList = document.querySelector("#answerList");
const prevButton = document.querySelector("#prevButton");
const resultSection = document.querySelector("#result");
const postDiagnosis = document.querySelector("#postDiagnosis");
const diagnosisSection = document.querySelector("#diagnosis");
const quizShell = document.querySelector("#quizShell");
const startDiagnosisButton = document.querySelector("#startDiagnosisButton");
const gatedLinks = document.querySelectorAll(".gated-link");

let latestDiagnosisResult = null;

function formatMoney(amount) {
  return `${Math.round(amount).toLocaleString()}万円`;
}

function getAnswer(index) {
  const value = state.answers[index];
  return questions[index].answers.find((answer) => answer.value === value) ?? questions[index].answers[0];
}

function getCompanySizeAnswer() {
  return questions[0].answers.find((answer) => answer.sizeLabel === state.answers[0]) ?? questions[0].answers[1];
}

function openDiagnosis() {
  diagnosisSection.hidden = false;
  quizShell.hidden = false;
  resultSection.hidden = true;
  postDiagnosis.hidden = true;
  diagnosisSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function restartDiagnosis() {
  state.current = 0;
  state.answers = Array(questions.length).fill(null);
  document.body.classList.remove("has-result");
  gatedLinks.forEach((link) => {
    link.setAttribute("aria-disabled", "true");
  });
  renderQuestion();
  openDiagnosis();
}

function renderQuestion() {
  const question = questions[state.current];
  const progress = ((state.current + 1) / questions.length) * 100;

  questionCount.textContent = `Q${state.current + 1} / ${questions.length}`;
  progressPercent.textContent = `${Math.round(progress)}%`;
  progressBar.style.width = `${progress}%`;
  questionIntent.textContent = question.intent;
  questionText.textContent = question.text;
  answerList.innerHTML = "";

  question.answers.forEach((answer) => {
    const selectedValue = question.type === "companySize" ? answer.sizeLabel : answer.value;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    if (state.answers[state.current] === selectedValue) {
      button.classList.add("is-selected");
    }
    button.innerHTML = `<span>${answer.label}</span><strong>${answer.text}</strong>`;
    button.addEventListener("click", () => selectAnswer(selectedValue));
    answerList.appendChild(button);
  });

  prevButton.disabled = state.current === 0;
}

function selectAnswer(value) {
  state.answers[state.current] = value;
  renderQuestion();

  window.setTimeout(() => {
    if (state.current === questions.length - 1) {
      showResult();
      return;
    }
    state.current += 1;
    renderQuestion();
  }, 220);
}

function calculateLossBreakdown() {
  const company = getCompanySizeAnswer();
  const employees = company.employees;
  const annualNewHires = Math.max(1, Math.round(employees * newHireRate));
  const monthlyScale = Math.max(1, employees / 20);
  const seniorScale = Math.max(1, employees / 30);

  const educationMonths = getAnswer(1).educationMonths;
  const dailyTrainingHours = getAnswer(2).dailyTrainingHours;
  const repeatQuestionHours = getAnswer(3).repeatQuestionHours;
  const manualLossHours = getAnswer(4).manualLossHours;
  const veteranLossHours = getAnswer(5).veteranLossHours;
  const handoverHours = getAnswer(6).handoverHours;
  const variationHours = getAnswer(7).variationHours;

  const training = annualNewHires * educationMonths * 20 * dailyTrainingHours * hourlyWage;
  const repeatedQuestions = repeatQuestionHours * 4 * 12 * hourlyWage * monthlyScale;
  const manual = manualLossHours * 4 * 12 * hourlyWage * monthlyScale;
  const veteran = veteranLossHours * 12 * hourlyWage * seniorScale;
  const handover = handoverHours * 12 * hourlyWage;
  const variation = variationHours * 12 * hourlyWage * monthlyScale;

  return [
    { label: "新人教育にかかる時間", amount: training },
    { label: "同じ質問への繰り返し対応", amount: repeatedQuestions },
    { label: "マニュアル未整備による確認ロス", amount: manual },
    { label: "ベテラン社員への業務集中", amount: veteran },
    { label: "引継ぎ作業", amount: handover },
    { label: "説明のばらつき・手戻り", amount: variation },
  ].map((item) => ({
    ...item,
    amountMan: Math.round(item.amount / 10000),
  }));
}

function getTotalScore() {
  return state.answers.slice(1).reduce((sum, answer) => sum + (answer ?? 0), 0);
}

function getResultType(totalLossMan) {
  if (totalLossMan < 50) return "A";
  if (totalLossMan < 150) return "B";
  if (totalLossMan < 300) return "C";
  return "D";
}

function renderLossBreakdown(items, totalLossMan) {
  const list = document.querySelector("#lossBreakdownList");
  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    const percent = totalLossMan > 0 ? Math.max(4, Math.round((item.amountMan / totalLossMan) * 100)) : 0;
    li.innerHTML = `
      <div class="breakdown-row">
        <span>${item.label}</span>
        <strong>${formatMoney(item.amountMan)}</strong>
      </div>
      <div class="breakdown-track" aria-hidden="true">
        <span style="width: ${percent}%"></span>
      </div>
    `;
    list.appendChild(li);
  });
}

function renderList(elementId, items) {
  const element = document.querySelector(elementId);
  element.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function unlockPostDiagnosis() {
  postDiagnosis.hidden = false;
  document.body.classList.add("has-result");
  gatedLinks.forEach((link) => {
    link.removeAttribute("aria-disabled");
  });
}

function showResult() {
  const breakdown = calculateLossBreakdown();
  const totalLossMan = breakdown.reduce((sum, item) => sum + item.amountMan, 0);
  const type = getResultType(totalLossMan);
  const content = resultContent[type];
  const company = getCompanySizeAnswer();
  const topIssues = breakdown
    .filter((item) => item.amountMan > 0)
    .sort((a, b) => b.amountMan - a.amountMan)
    .slice(0, 4)
    .map((item) => item.label);

  document.querySelector("#resultTitle").textContent = content.title;
  document.querySelector("#resultLead").textContent = `${company.sizeLabel}規模の組織として試算しています。${content.lead}`;
  document.querySelector("#lossAmount").textContent = formatMoney(totalLossMan);
  document.querySelector("#futureTitle").textContent = content.futureTitle;
  document.querySelector("#recommendationText").textContent =
    `貴社は、属人化により年間約${formatMoney(totalLossMan)}の損失が発生している可能性があります。特に影響が大きいのは、${topIssues.join("、")}です。`;

  renderList("#issueList", topIssues);
  renderList("#futureList", content.future);
  renderLossBreakdown(breakdown, totalLossMan);
  latestDiagnosisResult = {
    companySize: company.sizeLabel,
    employeeEstimate: company.employees,
    totalLossMan,
    resultType: type,
    resultTitle: content.title,
    resultLead: content.lead,
    topIssues,
    breakdown: breakdown.map((item) => ({
      label: item.label,
      amountMan: item.amountMan,
    })),
    answers: questions.map((question, index) => {
      const value = state.answers[index];
      const answer = question.type === "companySize"
        ? question.answers.find((item) => item.sizeLabel === value)
        : question.answers.find((item) => item.value === value);
      return {
        question: question.text,
        answer: answer?.text ?? "",
      };
    }),
  };

  diagnosisSection.hidden = true;
  resultSection.hidden = false;
  unlockPostDiagnosis();
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

prevButton.addEventListener("click", () => {
  if (state.current > 0) {
    state.current -= 1;
    renderQuestion();
  }
});

gatedLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!document.body.classList.contains("has-result")) {
      event.preventDefault();
      openDiagnosis();
    }
  });
});

document.querySelector('a[href="#diagnosis"]').addEventListener("click", (event) => {
  event.preventDefault();
  restartDiagnosis();
});

startDiagnosisButton.addEventListener("click", restartDiagnosis);

renderQuestion();

document.querySelector("#leadForm").addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    submitLeadForm(event.currentTarget);
  },
  true,
);

async function submitLeadForm(form) {
  const formMessage = document.querySelector("#formMessage");
  const submitButton = form.querySelector('button[type="submit"]');
  formMessage.className = "form-message";

  if (!GOOGLE_APPS_SCRIPT_WEB_APP_URL) {
    formMessage.classList.add("is-error");
    formMessage.textContent = "送信先の設定が未完了です。Google Apps ScriptのWebアプリURLを設定してください。";
    return;
  }

  const formData = new FormData(form);
  const payload = {
    submittedAt: new Date().toISOString(),
    name: formData.get("name")?.toString().trim() ?? "",
    email: formData.get("email")?.toString().trim() ?? "",
    phone: formData.get("phone")?.toString().trim() ?? "",
    message: formData.get("message")?.toString().trim() ?? "",
    pageUrl: window.location.href,
    diagnosis: latestDiagnosisResult,
  };

  if (!payload.email) {
    formMessage.classList.add("is-error");
    formMessage.textContent = "メールアドレスを入力してください。";
    return;
  }

  submitButton.disabled = true;
  formMessage.classList.add("is-loading");
  formMessage.textContent = "送信しています...";

  const body = new FormData();
  body.append("payload", JSON.stringify(payload));

  try {
    await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body,
    });
    const resultTitle = payload.diagnosis?.resultTitle || "診断結果";
    const lossAmount = payload.diagnosis?.totalLossMan ?? 0;
    const consultation = payload.message || "未入力";

    formMessage.className = "form-message is-success";
    formMessage.innerHTML = `
      <strong>お申し込みありがとうございます。確認メールを自動送信しました。</strong>
      <span>送信先メールアドレス: ${escapeHtml(payload.email)}</span>
      <span>お名前: ${escapeHtml(payload.name || "未入力")}</span>
      <span>電話番号: ${escapeHtml(payload.phone || "未入力")}</span>
      <span>相談内容: ${escapeHtml(consultation)}</span>
      <span>診断結果: ${escapeHtml(resultTitle)} / 年間損失額の目安 約${escapeHtml(String(lossAmount))}万円</span>
      <span>担当者より、診断内容をもとにご連絡します。</span>
    `;
    form.reset();
  } catch (error) {
    formMessage.className = "form-message is-error";
    formMessage.textContent = "送信に失敗しました。時間をおいて再度お試しください。";
  } finally {
    submitButton.disabled = false;
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  })[char]);
}
