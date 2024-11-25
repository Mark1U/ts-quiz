import './style.css'
import IQuestion from './interfaces/IQuestion';
//home view language choice
const home = document .querySelector('#home') as HTMLDivElement;
const easyGermanBtn = document .querySelector('#easyGermanBtn') as HTMLButtonElement;
const hardGermanBtn = document .querySelector('#hardGermanBtn') as HTMLButtonElement;
const easyEnglishBtn = document .querySelector('#easyEnglishBtn')as HTMLButtonElement;
const hardEnglishBtn = document .querySelector('#hardEnglishBtn')as HTMLButtonElement;

//quiz view
const quiz = document .querySelector('#quiz') as HTMLDivElement;
const progressCounter = document .querySelector('#progressCounter')as HTMLParagraphElement;
const question = document .querySelector('#question')as HTMLHeadElement;
const radios = document.getElementsByName('choice') as NodeListOf<HTMLInputElement>;
/* const answerAbtn = document .querySelector('#answerAbtn')
const answerBbtn = document .querySelector('#answerBbtn')
const answerCbtn = document .querySelector('#answerCbtn')
const answerDbtn = document .querySelector('#answerDbtn') */

const answerTextA = document .querySelector('#answerTextA') as HTMLDivElement;
const answerTextB= document .querySelector('#answerTextB') as HTMLDivElement;
const answerTextC= document .querySelector('#answerTextC') as HTMLDivElement;
const answerTextD= document .querySelector('#answerTextD') as HTMLDivElement;
const submitAnswer = document .querySelector('#submitAnswer') as HTMLButtonElement;

//leaderboard view
const leaderboard = document .querySelector('#leaderboard') as HTMLDivElement;
const points = document .querySelector('#points') as HTMLHeadElement;
const returnHome = document .querySelector('#returnHome') as HTMLButtonElement;


const gameList = [
    'https://vz-wd-24-01.github.io/typescript-quiz/questions/leicht.json', 
    'https://vz-wd-24-01.github.io/typescript-quiz/questions/schwer.json',
    'https://vz-wd-24-01.github.io/typescript-quiz/questions/easy.json',
    'https://vz-wd-24-01.github.io/typescript-quiz/questions/hard.json'];

    let questionList: IQuestion[] = [];

 const startGame = async (id:number) => {
    try {
        const response:Response = await fetch(gameList[id]);
        console.log(response);
        questionList = await response.json();
        console.log(questionList);
        
        
    } catch (error) {
       console.error('fetch failed', error); 
    }
}
easyGermanBtn?.addEventListener('click',() => startGame(0));
hardGermanBtn?.addEventListener('click',() => startGame(1));
easyEnglishBtn?.addEventListener('click',() => startGame(2));
hardEnglishBtn?.addEventListener('click',() => startGame(3));

