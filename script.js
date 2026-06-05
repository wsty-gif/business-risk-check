const questions = [
  {
    text: "新人が1人前になるまで、どれくらいかかりますか？",
    intent: "教育期間が長いほど、先輩社員の時間コストが増えます。",
    answers: [
      { label: "A", text: "1週間以内", value: 0 },
      { label: "B", text: "1か月程度", value: 1 },
      { label: "C", text: "3か月程度", value: 2 },
      { label: "D", text: "半年以上", value: 3 },
    ],
  },
  {
    text: "新人教育に、先輩社員は1日あたり何時間ほど使っていますか？",
    intent: "教育に使っている時間を年間損失額の目安に反映します。",
    answers: [
      { label: "A", text: "30分未満", value: 0 },
      { label: "B", text: "1時間程度", value: 1 },
      { label: "C", text: "2時間程度", value: 2 },
      { label: "D", text: "3時間以上", value: 3 },
    ],
  },
  {
    text: "新人やスタッフから、同じ質問を何回も受けることはありますか？",
    intent: "同じ質問への繰り返し対応は、見えにくい時間損失です。",
    answers: [
      { label: "A", text: "ほとんどない", value: 0 },
      { label: "B", text: "週に数回ある", value: 1 },
      { label: "C", text: "毎日のようにある", value: 2 },
      { label: "D", text: "何度も繰り返し聞かれる", value: 3 },
    ],
  },
  {
    text: "マニュアルは最新状態に更新されていますか？",
    intent: "古いマニュアルや未整備の状態は、確認ロスを生みます。",
    answers: [
      { label: "A", text: "常に更新されている", value: 0 },
      { label: "B", text: "一部だけ更新されている", value: 1 },
      { label: "C", text: "古い内容が多い", value: 2 },
      { label: "D", text: "ほぼ存在しない", value: 3 },
    ],
  },
  {
    text: "ベテラン社員が休むと、対応できない業務はありますか？",
    intent: "特定の人に業務が集中している度合いを確認します。",
    answers: [
      { label: "A", text: "ほとんどない", value: 0 },
      { label: "B", text: "少しある", value: 1 },
      { label: "C", text: "かなりある", value: 2 },
      { label: "D", text: "その人がいないと回らない業務がある", value: 3 },
    ],
  },
  {
    text: "引継ぎや業務説明に、毎月どれくらい時間を使っていますか？",
    intent: "引継ぎのたびに発生する説明時間を見える化します。",
    answers: [
      { label: "A", text: "1時間未満", value: 0 },
      { label: "B", text: "3時間程度", value: 1 },
      { label: "C", text: "5〜10時間程度", value: 2 },
      { label: "D", text: "10時間以上", value: 3 },
    ],
  },
  {
    text: "業務のやり方は、誰でも同じように説明できますか？",
    intent: "説明できる人が少ないほど、属人化リスクは高くなります。",
    answers: [
      { label: "A", text: "誰でも説明できる", value: 0 },
      { label: "B", text: "一部の人なら説明できる", value: 1 },
      { label: "C", text: "担当者しか説明できない業務が多い", value: 2 },
      { label: "D", text: "ほぼベテラン社員の頭の中にある", value: 3 },
    ],
  },
];

const resultContent = {
  A: {
    title: "属人化リスクは低めです",
    range: "0〜50万円",
    lead: "大きな属人化損失は発生しにくい状態です。ただし、今後の人員増加や退職リスクに備えて、マニュアル整備を進めておくと安心です。",
    futureTitle: "今後に備えておきたいこと",
    future: ["新人教育の標準化", "マニュアル更新の定期化", "担当者以外でも確認できる資料の整備"],
  },
  B: {
    title: "一部の業務で属人化が始まっています",
    range: "50万〜150万円",
    lead: "今は大きな問題になっていなくても、新人教育や引継ぎのたびに時間的コストが発生している可能性があります。",
    futureTitle: "放置すると起きやすいこと",
    future: ["新人教育の長期化", "同じ質問への繰り返し対応", "特定社員への確認集中"],
  },
  C: {
    title: "属人化リスクが高い状態です",
    range: "150万〜300万円",
    lead: "教育、質問対応、引継ぎ、確認作業に多くの時間が取られている可能性があります。特にベテラン社員の時間が奪われている場合、本来やるべき重要業務に集中できていない可能性があります。",
    futureTitle: "このまま放置すると",
    future: ["ベテラン社員の負担増加", "引継ぎ漏れや確認ミス", "教育品質のばらつき", "改善業務に使える時間の減少"],
  },
  D: {
    title: "属人化がかなり進んでいる可能性があります",
    range: "300万円以上",
    lead: "特定の人がいないと業務が止まる、新人教育に毎回時間がかかる、同じ説明を何度もしている、マニュアルが整備されていない状態が考えられます。",
    futureTitle: "大きな損失につながる可能性",
    future: ["退職・異動・急な欠勤時に業務が止まる", "教育コストが増え続ける", "引継ぎのたびに現場が混乱する", "ベテラン社員が疲弊する"],
  },
};

const issueLabels = [
  "新人教育にかかる時間",
  "同じ質問への繰り返し対応",
  "マニュアル未整備による確認ロス",
  "ベテラン社員への業務集中",
  "引継ぎ作業",
  "業務説明のばらつき",
];

const state = {
  current: 0,
  answers: Array(questions.length).fill(null),
};

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
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    if (state.answers[state.current] === answer.value) {
      button.classList.add("is-selected");
    }
    button.innerHTML = `<span>${answer.label}</span><strong>${answer.text}</strong>`;
    button.addEventListener("click", () => selectAnswer(answer.value));
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

function getTotalScore() {
  return state.answers.reduce((sum, answer) => sum + (answer ?? 0), 0);
}

function getEstimatedLoss(totalScore) {
  const maxScore = (questions.length - 1) * 0 + questions.length * 3;
  const ratio = totalScore / maxScore;
  return Math.round(Math.pow(ratio, 1.35) * 420);
}

function getResultType(loss) {
  if (loss < 50) return "A";
  if (loss < 150) return "B";
  if (loss < 300) return "C";
  return "D";
}

function getIssueList() {
  const highIndexes = state.answers
    .map((answer, index) => ({ answer, index }))
    .filter((item) => item.answer >= 2)
    .map((item) => item.index);

  if (highIndexes.length === 0) {
    return ["大きな損失要因は少ない状態です", "今後の人員増加に備えたマニュアル整備"];
  }

  const map = [
    issueLabels[0],
    issueLabels[0],
    issueLabels[1],
    issueLabels[2],
    issueLabels[3],
    issueLabels[4],
    issueLabels[5],
  ];

  return [...new Set(highIndexes.map((index) => map[index]))].slice(0, 5);
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
  const totalScore = getTotalScore();
  const estimatedLoss = getEstimatedLoss(totalScore);
  const type = getResultType(estimatedLoss);
  const content = resultContent[type];

  document.querySelector("#resultTitle").textContent = content.title;
  document.querySelector("#resultLead").textContent = content.lead;
  document.querySelector("#lossAmount").textContent = `${estimatedLoss}万円`;
  document.querySelector("#futureTitle").textContent = content.futureTitle;
  document.querySelector("#recommendationText").textContent =
    `貴社は、属人化により年間約${estimatedLoss}万円の損失が発生している可能性があります。主な原因は、${getIssueList().join("、")}です。`;
  renderList("#issueList", getIssueList());
  renderList("#futureList", content.future);

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
  openDiagnosis();
});

startDiagnosisButton.addEventListener("click", restartDiagnosis);

document.querySelector("#leadForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#formMessage").textContent =
    "お申し込みありがとうございます。診断結果をもとに、担当者よりご連絡します。";
  event.currentTarget.reset();
});

renderQuestion();
