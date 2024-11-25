import './style.css'
import IQuestion from './interfaces/IQuestion';

//home view language choice
const home = document.querySelector('#home') as HTMLDivElement;
const easyGermanBtn = document.querySelector('#easyGermanBtn') as HTMLButtonElement;
const hardGermanBtn = document.querySelector('#hardGermanBtn') as HTMLButtonElement;
const easyEnglishBtn = document.querySelector('#easyEnglishBtn') as HTMLButtonElement;
const hardEnglishBtn = document.querySelector('#hardEnglishBtn') as HTMLButtonElement;

//quiz view
const quiz = document.querySelector('#quiz') as HTMLDivElement;
const progressCounter = document.querySelector('#progressCounter') as HTMLParagraphElement;
const question = document.querySelector('#question') as HTMLHeadElement;
const radios = document.getElementsByName('choice') as NodeListOf<HTMLInputElement>;
const labels = document.querySelectorAll('label') as NodeListOf<HTMLLabelElement>;
/* const answerAbtn = document .querySelector('#answerAbtn')
const answerBbtn = document .querySelector('#answerBbtn')
const answerCbtn = document .querySelector('#answerCbtn')
const answerDbtn = document .querySelector('#answerDbtn') */

const answerTextA = document.querySelector('#answerTextA') as HTMLDivElement;
const answerTextB = document.querySelector('#answerTextB') as HTMLDivElement;
const answerTextC = document.querySelector('#answerTextC') as HTMLDivElement;
const answerTextD = document.querySelector('#answerTextD') as HTMLDivElement;
const submitAnswer = document.querySelector('#submitAnswer') as HTMLButtonElement;

//leaderboard view
const leaderBoard = document.querySelector('#leaderBoard') as HTMLDivElement;
const points = document.querySelector('#points') as HTMLHeadElement;
const returnHome = document.querySelector('#returnHome') as HTMLButtonElement;


const gameList = [
  'https://vz-wd-24-01.github.io/typescript-quiz/questions/leicht.json',
  'https://vz-wd-24-01.github.io/typescript-quiz/questions/schwer.json',
  'https://vz-wd-24-01.github.io/typescript-quiz/questions/easy.json',
  'https://vz-wd-24-01.github.io/typescript-quiz/questions/hard.json',
  'src/questions/q1.json',
];



let questionList: IQuestion[] = [];
let answeredList: number[] = [];
let quizPosition = -1;
let selAnswer = -1;
let isAnswer = false;
let score = 0;

const displayLeaderBoard = () => {
  quiz.classList.remove('active')
  quiz.classList.add('hidden')
  leaderBoard.classList.remove('hidden')
  leaderBoard.classList.add('active')
  points.textContent = score + " / " + questionList.length;

}

const displayAnswer = () => {

  radios.forEach((radio) => {
    radio.disabled = true;
  })

  answeredList.push(selAnswer)
  if (selAnswer != questionList[quizPosition].correct) {
    labels[selAnswer].classList.add('wrongAnswer')
  } else {
    score++;
  }

  labels[questionList[quizPosition].correct].classList.add('correctAnswer')
}

const displayQuestion = () => {
  quizPosition++;
  if (quizPosition == questionList.length) {
    displayLeaderBoard()
    return
  }

  radios.forEach((radio) => {
    radio.disabled = false;
    radio.checked = false;
  })

  const q = questionList[quizPosition];
  progressCounter.textContent = `${quizPosition + 1}/${questionList.length}`;
  question.textContent = q.question;
  answerTextA.textContent = q.answers[0];
  answerTextB.textContent = q.answers[1];
  answerTextC.textContent = q.answers[2];
  answerTextD.textContent = q.answers[3];

  submitAnswer.disabled = true;
}

const startGame = async (id: number) => {
  try {
    score = 0;
    quizPosition = -1;
    home.classList.remove('active')
    home.classList.add('hidden')
    quiz.classList.remove('hidden')
    quiz.classList.add('active')

    const response: Response = await fetch(gameList[id]);
    console.log(response);
    questionList = await response.json();
    questionList = questionList.slice(0, 2);
    console.log(questionList);

    displayQuestion()
  } catch (error) {
    console.error('fetch failed', error);
  }
}

easyGermanBtn?.addEventListener('click', () => startGame(0));
hardGermanBtn?.addEventListener('click', () => startGame(1));
easyEnglishBtn?.addEventListener('click', () => startGame(2));
hardEnglishBtn?.addEventListener('click', () => startGame(3));


submitAnswer.addEventListener('click', (e) => {
  e.preventDefault();
  if (isAnswer) {

    submitAnswer.textContent = "Submit";
    if (selAnswer != questionList[quizPosition].correct) {
      labels[selAnswer].classList.remove('wrongAnswer')
    }

    labels[questionList[quizPosition].correct].classList.remove('correctAnswer')
    radios.forEach((radio) => {
      radio.disabled = false;
    })
    displayQuestion();
  } else {
    submitAnswer.textContent = "Next Question";
    displayAnswer();
  }
  console.log({ isAnswer })
  isAnswer = !isAnswer
  console.log({ isAnswer })
})

labels.forEach((label, index) => label.addEventListener('click', () => {
  selAnswer = index;
  submitAnswer.disabled = false;
}))


returnHome.addEventListener('click', () => {
  leaderBoard.classList.remove('active')
  leaderBoard.classList.add('hidden')
  home.classList.remove('hidden')
  home.classList.add('active')
})