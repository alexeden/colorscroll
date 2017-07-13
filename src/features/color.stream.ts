


let stream: ColorStream;

export class ColorStream {
  static get(): ColorStream {
    return stream || new ColorStream();
  }

  private constructor() {
    console.log('creating color stream');
  }
}
