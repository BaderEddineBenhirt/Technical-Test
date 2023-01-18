import { Component, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { EvaluationService } from './evaluation.service';
import { timer, Subscription, fromEvent } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { threadId } from 'worker_threads';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-evaluation',
  template: `
    <div class="row justify-content-center">
      <div style="position : absolute; top : 25% ; left:25%">
        <div *ngIf="preLoadingJava">
          <h1>Le test Java va commencer apres :{{ timeLeft2 }}</h1>
        </div>
        <div *ngIf="preLoadingSql">
          <h1>Le test Sql va commencer apres :{{ timeLeft2 }}</h1>
        </div>
        <div *ngIf="preLoadingJavaS">
          <h1>Le test JavaScript va commencer apres :{{ timeLeft2 }}</h1>
        </div>
      </div>
      <div *ngIf="preload === false && testing === false" class="container">
        <h2 class="text-center mb-4">Veillez choisir un sujet</h2>
        <div class="text-center">
          <button
            [ngStyle]="{ 'background-color': javaChecked ? '#73c7af' : '' }"
            class="btn btn-primary mr-3"
            (click)="!javaChecked ? startTimer2() : ''"
          >
            <img
              *ngIf="javaChecked"
              src="assets/check-solid.svg"
              style="width  : 12px ;"
            />
            Java
          </button>
          <button
            [ngStyle]="{ 'background-color': sqlChecked ? '#73c7af' : '' }"
            class="btn btn-primary mr-3"
            (click)="!sqlChecked ? startTimer3() : ''"
          >
            <img
              *ngIf="sqlChecked"
              src="assets/check-solid.svg"
              style="width  : 12px ;"
            />
            SQL
          </button>
          <button
            [ngStyle]="{ 'background-color': jsChecked ? '#73c7af' : '' }"
            class="btn btn-primary"
            (click)="!jsChecked ? startTimer4() : ''"
          >
            <img
              *ngIf="jsChecked"
              src="assets/check-solid.svg"
              style="width  : 12px ;  color : white;"
            />
            JavaScript
          </button>
            
        </div>
      </div>

      <div class="card" *ngIf="currentQuestion && testing === true">
        <h2>{{ questionText }}</h2>
        <div>
          <b>
            <img src="assets/clock-regular.svg" style="width  : 16px ;" />Time
            left : {{ timeLeft }}</b
          >
        </div>
        <div *ngFor="let option of currentQuestion.options">
          <input
            (change)="onChange($event)"
            #radioInput
            type="radio"
            name="{{ currentQuestion.id }}"
            [value]="option"
          />
          {{ option }}
        </div>
        <div
          style="display:flex; justify-content: center;"
          class="row text-center"
        >
          <button
            class="text-center col-3"
            *ngIf="maxNum !== 0"
            (click)="nextQuestion()"
            #nextBtn
          >
            Next
          </button>
          <button
            class="text-center col-3"
            *ngIf="maxNum === 0"
            (click)="finish()"
            #nextBtn
          >
            Terminer
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-4"><canvas #chartJava></canvas></div>
        <div class="col-4"><canvas #chartSql></canvas></div>
        <div class="col-4"><canvas #chartJs></canvas></div>
      </div>
      <div
        class="row text-center"
        style="display:flex; justify-content : center  "
      >
        <div class="col-5" text-center>
          <canvas #chart></canvas>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./technical.component.css'],
})
export class TechnicalComponent implements OnInit {
  static count : number = 0;
 
  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
   /* alert(
      'Nombre de fois dont tu as quitté le test ça va étre pris en consideration 10% de la note va diminuer à chaque fois' 
    );*/
    TechnicalComponent.count;
  }
  

  
  currentQuestion: any;
  questions!: any[];
  currentIndex!: number;
  displayedQuestionsIndex!: Set<number>;
  private nextBtnClick$!: Subscription;
  private timer$!: Subscription;
  private timer2$!: Subscription;
  timeLeft: number = 60;

  timeLeft2!: number; //one minutes for each question
  index: number = 1;
  score: number = 0;
  answer: string = '';

  javaScore: number = 0;
  sqlScore: number = 0;
  jsScore: number = 0;

  javaScorePer: number = 0;
  sqlScorePer: number = 0;
  jsScorePer: number = 0;
  scorePer: number = 0;

  preLoadingJava = false;
  preLoadingSql = false;
  preLoadingJavaS = false;

  preload = false;
  questionText: string = '';

  javaChecked: boolean = false;
  sqlChecked: boolean = false;
  jsChecked: boolean = false;

  currentSubject: string = '';

  maxNum: number = 5;

  testing: boolean = false;

  @ViewChild('nextBtn') nextBtn!: any;
  @ViewChildren('radioInput') radioInputs!: any;

  @ViewChild('chart') chartRef: any;

  @ViewChild('chartJava') chartRef1: any;
  @ViewChild('chartSql') chartRef2: any;
  @ViewChild('chartJs') chartRef3: any;

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit() {}

  loadJavaQuestions() {
    this.answer = '';
    this.index = 1;
    this.maxNum = 5;
    this.javaChecked = true;
    this.currentSubject = 'java';
    this.testing = true;
    this.evaluationService.loadJavaQuestions();
    this.questions = this.evaluationService.getQuestions();
    this.displayedQuestionsIndex = new Set<number>();
    this.currentIndex = this.getRandomQuestionIndex();
    this.currentQuestion = this.questions[this.currentIndex];
    this.questionText =
      'Question ' + this.index + ' : ' + this.currentQuestion.text;
    this.currentQuestion.options = this.shuffleArray();
    this.index++;
    this.maxNum--;
    this.startTimer();
    this.timeLeft = this.currentQuestion.duration;

    this.nextBtnClick$ = fromEvent(this.nextBtn.nativeElement, 'click')
      .pipe(
        takeUntil(
          timer(this.timeLeft * 1000).pipe(
            switchMap(async () => {
              if (this.timeLeft === 0) {
                this.nextQuestion();
              }
            })
          )
        )
      )
      .subscribe(() => {
        this.stopTimer();
        this.nextQuestion();
      });
  }

  loadSqlQuestions() {
    this.answer = '';
    this.index = 1;
    this.maxNum = 5;
    this.sqlChecked = true;
    this.currentSubject = 'sql';
    this.testing = true;
    this.evaluationService.loadSqlQuestions();
    this.questions = this.evaluationService.getQuestions();
    this.displayedQuestionsIndex = new Set<number>();
    this.currentIndex = this.getRandomQuestionIndex();
    this.currentQuestion = this.questions[this.currentIndex];
    this.questionText =
      'Question ' + this.index + ' : ' + this.currentQuestion.text;
    this.currentQuestion.options = this.shuffleArray();
    this.index++;
    this.maxNum--;
    this.startTimer();
    this.timeLeft = this.currentQuestion.duration;

    this.nextBtnClick$ = fromEvent(this.nextBtn.nativeElement, 'click')
      .pipe(
        takeUntil(
          timer(this.timeLeft * 1000).pipe(
            switchMap(async () => {
              if (this.timeLeft === 0) {
                this.nextQuestion();
              }
            })
          )
        )
      )
      .subscribe(() => {
        this.stopTimer();
        this.nextQuestion();
      });
  }

  loadJavaScriptQuestions() {
    this.answer = '';
    this.index = 1;
    this.maxNum = 5;
    this.testing = true;
    this.jsChecked = true;
    this.currentSubject = 'js';
    this.evaluationService.loadJavaScriptQuestions();
    this.questions = this.evaluationService.getQuestions();
    this.displayedQuestionsIndex = new Set<number>();
    this.currentIndex = this.getRandomQuestionIndex();
    this.currentQuestion = this.questions[this.currentIndex];
    this.questionText =
      'Question ' + this.index + ' : ' + this.currentQuestion.text;
    this.currentQuestion.options = this.shuffleArray();
    this.index++;
    this.maxNum--;
    this.startTimer();
    this.timeLeft = this.currentQuestion.duration;

    this.nextBtnClick$ = fromEvent(this.nextBtn.nativeElement, 'click')
      .pipe(
        takeUntil(
          timer(this.timeLeft * 1000).pipe(
            switchMap(async () => {
              if (this.timeLeft === 0) {
                this.nextQuestion();
              }
            })
          )
        )
      )
      .subscribe(() => {
        this.stopTimer();
        this.nextQuestion();
      });
  }

  startTimer() {
    this.timer$ = timer(1000, 1000).subscribe((val) => {
      this.timeLeft = this.timeLeft - 1;
      if (this.timeLeft == 0) {
        this.nextQuestion();
      }
    });
  }

  startTimer2() {
    this.timeLeft2 = 5;
    this.preload = true;
    this.preLoadingJava = true;
    this.timer2$ = timer(1000, 1000).subscribe((val) => {
      this.timeLeft2 = this.timeLeft2 - 1;
      if (this.timeLeft2 == 0) {
        this.preLoadingJava = false;
        this.preload = false;
        this.timer2$.unsubscribe();
        this.loadJavaQuestions();
      }
    });
  }

  startTimer3() {
    this.timeLeft2 = 5;
    this.preload = true;
    this.preLoadingSql = true;
    this.timer2$ = timer(1000, 1000).subscribe((val) => {
      this.timeLeft2 = this.timeLeft2 - 1;
      if (this.timeLeft2 == 0) {
        this.preLoadingSql = false;
        this.preload = false;
        this.timer2$.unsubscribe();
        this.loadSqlQuestions();
      }
    });
  }

  startTimer4() {
    this.timeLeft2 = 5;
    this.preload = true;
    this.preLoadingJavaS = true;
    this.timer2$ = timer(1000, 1000).subscribe((val) => {
      this.timeLeft2 = this.timeLeft2 - 1;
      if (this.timeLeft2 == 0) {
        this.preLoadingJavaS = false;
        this.preload = false;
        this.timer2$.unsubscribe();
        this.loadJavaScriptQuestions();
      }
    });
  }

  stopTimer() {
    this.timer$.unsubscribe();
  }

  stopTimer2() {
    this.timer2$.unsubscribe();
  }

  nextQuestion() {
    this.stopTimer();
    this.evaluate();

    if (this.maxNum > 0) {
      console.log(this.maxNum);
      this.resetRadios();
      this.stopTimer();
      this.answer = '';
      this.displayedQuestionsIndex.add(this.currentIndex);
      this.currentIndex = this.getRandomQuestionIndex();
      this.currentQuestion = this.questions[this.currentIndex];
      this.currentQuestion.options = this.shuffleArray();
      this.questionText =
        'Question ' + this.index + ' : ' + this.currentQuestion.text;
      this.index++;
      this.maxNum--;
      this.timeLeft = this.currentQuestion.duration;
      this.startTimer();
    }
  }
  onChange(event: any) {
    this.answer = event.target.value;
    console.log(event.target.value);
  }

  evaluate() {
    if (this.answer === this.currentQuestion.correctAnswer) {
      if (this.currentSubject === 'java') {
        this.javaScore++;
      }
      if (this.currentSubject === 'sql') {
        this.sqlScore++;
      }
      if (this.currentSubject === 'js') {
        this.jsScore++;
      }
      this.score++;
    }

    console.log('java score  : ' + this.javaScore);
    console.log('sql score  : ' + this.sqlScore);
    console.log('JavaScript score  : ' + this.jsScore);
    console.log('score total: ' + this.score);
  }

  finish() {
    this.stopTimer();
    this.testing = false;
    this.evaluate();
    if (
      this.javaChecked &&
      this.sqlChecked &&
      this.jsChecked &&
      !this.testing
    ) {
      this.javaScorePer = (this.javaScore * 100) / 5;
      this.sqlScorePer = (this.sqlScore * 100) / 5;
      this.jsScorePer = (this.jsScore * 100) / 5;
        this.scorePer = (this.score * 100) / 15;
        
      if (TechnicalComponent.count > 0) {
        for (let i = 0; i < TechnicalComponent.count; i++) {
          this.scorePer = this.scorePer - this.scorePer * 0.1;
          if (this.scorePer < 0) {
            this.scorePer = 0;
          }
        }
      } 
      this.loadScore();
    }
  }
  getRandomQuestionIndex(): number {
    let randomIndex = Math.floor(Math.random() * this.questions.length);
    while (this.displayedQuestionsIndex.has(randomIndex)) {
      randomIndex = Math.floor(Math.random() * this.questions.length);
    }
    return randomIndex;
  }

  resetRadios() {
    this.radioInputs.forEach(
      (input: { nativeElement: { checked: boolean } }) =>
        (input.nativeElement.checked = false)
    );
  }

  shuffleArray() {
    let array = this.currentQuestion.options;
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  loadScore() {
    let canvas = this.chartRef.nativeElement;
    let ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Score total : ' + this.scorePer.toFixed(2) + '%'],
        datasets: [
          {
            data: [this.scorePer, 100 - this.scorePer],
            backgroundColor: ['#ff6384', '#ccc'],
            hoverBackgroundColor: ['#ff6384', '#ccc'],
          },
        ],
      },
      options: {},
    });

    let canvas3 = this.chartRef3.nativeElement;
    let ctx3 = canvas3.getContext('2d');
    const chart3 = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['JavaScript : ' + this.jsScorePer.toFixed(2) + '%'],
        datasets: [
          {
            data: [this.jsScorePer, 100 - this.jsScorePer],
            backgroundColor: ['#ff6384', '#ccc'],
            hoverBackgroundColor: ['#ff6384', '#ccc'],
          },
        ],
      },
      options: {},
    });

    let canvas1 = this.chartRef1.nativeElement;
    let ctx1 = canvas1.getContext('2d');
    const chart1 = new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['Java : ' + this.javaScorePer.toFixed(2) + '%'],
        datasets: [
          {
            data: [this.javaScorePer, 100 - this.javaScorePer],
            backgroundColor: ['#ff6384', '#ccc'],
            hoverBackgroundColor: ['#ff6384', '#ccc'],
          },
        ],
      },
      options: {},
    });

    let canvas2 = this.chartRef2.nativeElement;
    let ctx2 = canvas2.getContext('2d');
    const chart2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['SQL: ' + this.sqlScorePer.toFixed(2) + '%'],
        datasets: [
          {
            data: [this.sqlScorePer, 100 - this.sqlScorePer],
            backgroundColor: ['#ff6384', '#ccc'],
            hoverBackgroundColor: ['#ff6384', '#ccc'],
          },
        ],
      },
      options: {},
    });
  }
}

