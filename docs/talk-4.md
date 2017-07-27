Patterns:
- Operation streams

Anti-patterns:
-

Fun facts:
- The `EventEmitter` used for component `@Output`s is just an RxJS `Subject` in disguise and the two types are interchangeable when declaring component outputs. The only difference is that `EventEmitter` provides an `emit` method, which is nothing more than a wrapper of the underlying `Subject`'s `next` method.
```
// From event_emitter.ts in the Angular source code:
export class EventEmitter<T> extends Subject<T> {
  ...
  emit(value?: T) {
    super.next(value);
  }
}
```

Useful practices:
- Subscription management using `.takeUntil`
- Make `@Input()`s reactive using `BehaviorSubject`s

RxJS+Angular Do's and Don'ts:

DO NOT subscribe to things in the `constructor`s of your components. I should be able to `new` your Component without it causing any side-effects. Remember, streams are lazy; they won't do anything until you subscribe to them. This is double-plus-important when it comes to things like API requests.

DO put any necessary subscribing inside the `ngOnInit` (or similar) life-cycle hook of your component. Doing so will also make your components much easier to test.

General guidance:
- If you're going to be integrating static (non-observable) values within the definitions of reactive values, like say, of an component's `@Input()`, be sure to do so in such a way that the static value is evaluated with each execution of the reactive value wrapper

```
@Input() selectedAxis: 'x'|'y';
point$: Observable<{ x: number, y: number }>;
selectedAxisValue$: Observable<number>;

ngOnInit() {
  // Assume this.point$ is already defined

  // Bad:
  // Doing it like this means that we will always be
  // plucking the axis that was set when this.selectedAxisValue$
  // gets instantiated, even if the value of selectedAxis changes
  this.selectedAxisValue$ = this.point$.pluck(this.selectedAxis);

  // Good:
  // Any usage of the selectedAxis input should lazily evaluated,
  // which is a fancy way of saying it should be used within a function
  this.selectedAxisValue$ = this.point$.map(point => point[this.selectedAxis]);
  // Now, the value of selectedAxis get evaluated each time the
  // function inside .map is called
}
```
