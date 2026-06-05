const questions = [
  {
    text: "その業務を一番詳しく知っている人が急に休んだ場合、現場はどうなりますか？",
    intent: "人に依存している危険性を確認します。",
    answers: [
      "問題なく対応できる",
      "少し確認が必要だが対応できる",
      "一部の業務が止まる",
      "かなりの業務が止まる",
    ],
  },
  {
    text: "新人や異動者が業務を覚えるまでに、どれくらい時間がかかりますか？",
    intent: "教育期間をコストとして見える化します。",
    answers: [
      "1週間以内",
      "1か月程度",
      "3か月以上",
      "半年以上、または人によって大きく差がある",
    ],
  },
  {
    text: "業務のやり方は、誰が教えても同じ内容になりますか？",
    intent: "教育のばらつきによる品質低下リスクを確認します。",
    answers: ["ほぼ同じ", "多少違う", "人によってかなり違う", "教える人の経験や感覚に任されている"],
  },
  {
    text: "業務マニュアルや手順書は、現在の実務に合っていますか？",
    intent: "マニュアルが存在していても使える状態かを確認します。",
    answers: [
      "常に最新に近い",
      "一部古いが使える",
      "古い内容が多く、現場ではあまり使われていない",
      "そもそも存在しない、または探せない",
    ],
  },
  {
    text: "同じ質問や確認が、現場で何度も発生していますか？",
    intent: "教育負担や時間損失を可視化します。",
    answers: ["ほとんどない", "たまにある", "かなり多い", "毎日のように発生している"],
  },
  {
    text: "引き継ぎ時に、抜け漏れや認識違いが起きたことはありますか？",
    intent: "引き継ぎミスが業務リスクになっていないかを確認します。",
    answers: [
      "ほぼない",
      "たまにある",
      "何度か問題になった",
      "大きなトラブルや顧客対応につながったことがある",
    ],
  },
  {
    text: "ベテラン社員の頭の中にしかないノウハウがありますか？",
    intent: "退職・異動・休職時の危険性を確認します。",
    answers: ["ほとんどない", "一部ある", "かなりある", "重要業務の多くがベテラン頼み"],
  },
  {
    text: "業務改善や教育資料作成に、時間をかけられていますか？",
    intent: "分かっているけど後回しになっている課題を確認します。",
    answers: [
      "定期的にできている",
      "必要な時だけできている",
      "やりたいが後回しになっている",
      "忙しすぎて全くできていない",
    ],
  },
];

const resultContent = {
  A: {
    title: "業務標準化レベル：良好",
    lead:
      "現在、大きな属人化リスクは低い状態です。ただし、人員増加・多拠点化・業務拡大が進むと、今の仕組みだけでは教育や共有が追いつかなくなる可能性があります。",
    issueTitle: "今の課題",
    issues: ["マニュアル更新の手間", "教育資料作成の負担", "ノウハウ共有の効率化"],
    futureTitle: "次に起きやすいこと",
    future: ["業務拡大時に更新が追いつかない", "拠点やチームごとの差が少しずつ生まれる", "教育資料の作成が特定担当者に偏る"],
    recommendation:
      "今のうちにAIでマニュアル作成・更新を自動化すると、標準化レベルを維持したまま、教育コストをさらに削減できます。",
  },
  B: {
    title: "業務属人化リスク：注意レベル",
    lead: "一見問題なく回っているように見えても、現場ではすでに小さな属人化が始まっています。",
    issueTitle: "起きやすい問題",
    issues: ["教える人によって内容が変わる", "新人の成長スピードに差が出る", "同じ質問が繰り返される", "引き継ぎ時に抜け漏れが起きる"],
    futureTitle: "このまま放置すると",
    future: ["人員増加で教育負担が増える", "退職や異動が重なるとミスが増える", "現場ごとのやり方が固定化される"],
    recommendation:
      "早い段階で業務手順をAIで整理し、誰でも同じ品質で教えられる状態を作ることが重要です。",
  },
  C: {
    title: "業務属人化リスク：高レベル",
    lead: "現在、業務がかなり人に依存している可能性があります。特定の社員の経験・記憶・口頭説明に頼っている状態です。",
    issueTitle: "すでに起きている可能性が高い問題",
    issues: [
      "新人教育に時間がかかりすぎている",
      "ベテラン社員の負担が増えている",
      "マニュアルが古く、現場で使われていない",
      "業務品質が人によってばらつく",
      "引き継ぎミスが発生しやすい",
    ],
    futureTitle: "このまま放置すると",
    future: ["退職時にノウハウが失われる", "新人が定着しにくくなる", "顧客対応や品質トラブルにつながる", "業務改善に手が回らなくなる"],
    recommendation:
      "今すぐ、現場の業務を見える化し、マニュアル化する必要があります。AI搭載ツールを使えば、普段の説明やチャット入力から新人向けマニュアルを作成できます。",
  },
  D: {
    title: "業務ブラックボックス化：危険レベル",
    lead:
      "現在、かなり危険な状態です。特定の人がいないと業務が回らない、新人教育が現場任せ、重要なノウハウが記録されていない可能性があります。",
    issueTitle: "すでに発生している可能性が高い問題",
    issues: [
      "人が辞めると業務が止まる",
      "教育担当者の負担が限界に近い",
      "新人が何度も同じ質問をする",
      "マニュアルが存在しない、または使えない",
      "引き継ぎが口頭や個人メモに依存している",
      "現場のやり方が人によってバラバラ",
    ],
    futureTitle: "このまま放置すると危険なこと",
    future: [
      "退職・異動で業務ノウハウが消える",
      "教育コストが増え続ける",
      "ミスやクレームが増える",
      "ベテラン社員が疲弊する",
      "新人が育つ前に辞める",
      "管理者が現場の実態を把握できなくなる",
    ],
    recommendation:
      "まずは、頭の中にある業務手順を外に出し、誰でも見られる形にすることです。AI搭載マニュアル作成ツールなら、現場の説明・音声・チャットから、短時間で新人向けマニュアルを作成できます。",
  },
};

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
const nextButton = document.querySelector("#nextButton");
const resultSection = document.querySelector("#result");

function renderQuestion() {
  const question = questions[state.current];
  const progress = ((state.current + 1) / questions.length) * 100;

  questionCount.textContent = `Q${state.current + 1} / ${questions.length}`;
  progressPercent.textContent = `${Math.round(progress)}%`;
  progressBar.style.width = `${progress}%`;
  questionIntent.textContent = question.intent;
  questionText.textContent = question.text;
  answerList.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    if (state.answers[state.current] === index) {
      button.classList.add("is-selected");
    }
    button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span><strong>${answer}</strong>`;
    button.addEventListener("click", () => {
      state.answers[state.current] = index;
      renderQuestion();
    });
    answerList.appendChild(button);
  });

  prevButton.disabled = state.current === 0;
  nextButton.disabled = state.answers[state.current] === null;
  nextButton.textContent = state.current === questions.length - 1 ? "結果を見る" : "次へ";
}

function getResultType() {
  const total = state.answers.reduce((sum, answer) => sum + answer, 0);
  if (total <= 5) return "A";
  if (total <= 11) return "B";
  if (total <= 17) return "C";
  return "D";
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

function showResult() {
  const type = getResultType();
  const content = resultContent[type];
  const total = state.answers.reduce((sum, answer) => sum + answer, 0);
  const score = Math.round((total / 24) * 100);

  document.querySelector("#resultTitle").textContent = content.title;
  document.querySelector("#resultLead").textContent = content.lead;
  document.querySelector("#riskScore").textContent = `${score}%`;
  document.querySelector("#issueTitle").textContent = content.issueTitle;
  document.querySelector("#futureTitle").textContent = content.futureTitle;
  document.querySelector("#recommendationText").textContent = content.recommendation;
  renderList("#issueList", content.issues);
  renderList("#futureList", content.future);

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

prevButton.addEventListener("click", () => {
  if (state.current > 0) {
    state.current -= 1;
    renderQuestion();
  }
});

nextButton.addEventListener("click", () => {
  if (state.answers[state.current] === null) return;

  if (state.current === questions.length - 1) {
    showResult();
    return;
  }

  state.current += 1;
  renderQuestion();
});

document.querySelector("#leadForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#formMessage").textContent =
    "送信ありがとうございます。実運用では、このフォームをCRMやメール配信ツールに接続します。";
  event.currentTarget.reset();
});

renderQuestion();
