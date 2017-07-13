import { Observable, Observer } from 'rxjs';
import * as Rx from 'rxjs';

/* Put Rx values on the window */
Object.entries(Rx).map(([prop, value]) => window[prop] = value);
console.clear();

const observeInConsole
  = (tag: string): Observer<any> => ({
      next: (value: any) => console.log(`%c${tag} next: `, `color: #fff; background-color: #2196F3;`, value),
      error: (err: any) => console.log(`%c${tag} error: `, `background-color: #ee0000; color: #ffffff;`, err),
      complete: () => console.log(`%c${tag} completed`, `color: #333; background-color: #AEEA00;`)
    });

const $ = (selector: string) => document.querySelector(selector) as HTMLElement;

const htmlFromString =
  (innerHTML: string) => {
    const template = Object.assign(document.createElement('template'), { innerHTML });
    return Array.from(template.content.children)[0] as HTMLElement;
  };
/* ------------------------------------------------------------------------------------------------*/

class Viewer {
  element: HTMLElement;
  private loaderElement: HTMLElement;
  private outputElement: HTMLElement;
  private startButton: HTMLElement;
  private startButtonClicks$: Observable<MouseEvent>;
  private stopButton: HTMLElement;
  private stopButtonClicks$: Observable<MouseEvent>;

  constructor(
    public id: number,
    private stream$: Observable<any>
  ) {
    this.element = htmlFromString(`
      <div class="ui item">
        <div class="content">
          <div class="ui small buttons right floated">
            <button class="ui green button start-button">
              <i class="icon play"></i>Start
            </button>
            <button class="ui red basic button disabled stop-button">
              <i class="icon stop"></i>Unsubscribe
            </button>
          </div>
          <div class="header">Viewer #${this.id}</div>
          <div class="meta">
            <div class="ui inline loader"></div>
            <span class="output"><em>No output yet</em></span>
          </div>
        </div>
      </div>
    `);
    this.loaderElement = this.element.querySelector('.loader') as HTMLElement;
    this.outputElement = this.element.querySelector('.output') as HTMLElement;
    this.startButton = this.element.querySelector('.start-button') as HTMLElement;
    this.startButtonClicks$ = Observable.fromEvent(this.startButton, 'click');
    this.stopButton = this.element.querySelector('.stop-button') as HTMLElement;
    this.stopButtonClicks$ = Observable.fromEvent(this.stopButton, 'click');

    // Wait for the start button to be clicked
    this.startButtonClicks$.subscribe(() => this.start());
  }

  private start() {
    // this.startButton.remove();
    this.loaderElement.classList.add('active');
    this.startButton.classList.add('basic');
    this.startButton.classList.add('disabled');
    this.stopButton.classList.remove('disabled');
    this.stopButton.classList.remove('basic');
    this.stream$
      .do(observeInConsole('stream$'))
      .takeUntil(this.stopButtonClicks$)
      .subscribe(
        output => {
          this.outputElement.innerHTML = output;
        },
        error => {
          console.error(error);
          this.stop();
        },
        () => {
          this.stop();
        }
      );
  }

  private stop() {
    this.loaderElement.classList.remove('active');
    this.startButton.classList.remove('basic');
    this.startButton.classList.remove('disabled');
    this.stopButton.classList.add('disabled');
    this.stopButton.classList.add('basic');
  }
}


const stopAllButtonClick$ = Observable.fromEvent($('#stop-all-viewers'), 'click');
const masterStream$ =
  Observable.interval(1000)
    .takeUntil(stopAllButtonClick$);
  // .share();
  // Observable.create((observer: Observer<any>) => {
  // observer.next(5);
  // observer.complete();
  // });

Observable.fromEvent($('#add-viewer'), 'click')
  .startWith(null)
  .scan((count: number, _): number => count + 1, 0)
  .map((id: number) => {
    return new Viewer(id, masterStream$);
  })
  .subscribe(watcher => {
    $('#viewer-list').appendChild(watcher.element);
  });
