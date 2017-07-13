import { Observer } from 'rxjs/Observer';

const nextCss = `color: #fff; background-color: #2196F3;`;
const completeCss = `color: #333; background-color: #AEEA00; font-weight: bold;`;
const errorCss = `background-color: #ee0000; color: #ffffff; font-weight: bold;`;


export const observeInConsole
  = (tag: string): Observer<any> =>
      ({
        next(value: any) {
          console.log(`%c${tag} next: `, nextCss, value);
        },
        error(err: any) {
          console.log(`%c${tag} error: `, errorCss, err);
        },
        complete() {
          console.log(`%c${tag} completed`, completeCss);
        }
      });

export const isHtmlElement =
  (x: any): x is HTMLElement => {
    return x !== null
      && typeof x === 'object'
      && typeof x.tagName === 'string';
  };

export const htmlFromString: (innerHTML: string) => HTMLElement =
  innerHTML => {
    const template = document.createElement('template');
    template.innerHTML = innerHTML;
    if(template.content.children.length !== 1) {
      console.error('A template did not produce a valid HTML Element!', innerHTML);
    }
    /* Extract the first child from the <template> */
    const element = Array.from(template.content.children)[0];
    element.innerHTML = element.innerHTML.trim();
    return element as HTMLElement;
  };

export const writeToSelector =
  <T>(selector: string, content: T): T => {
    const selection = document.querySelectorAll(selector);
    if(selection.length < 1) {
      throw new Error(`Couldn't find any elements using the selector "${selector}"`);
    }

    Array.from(selection)
      .forEach(elem =>
        Object.assign(elem, { innerHTML: content })
      );
    return content;
  };

type ElementSwapFunction = (parent: HTMLElement, children: HTMLElement[], newChild: HTMLElement) => void;

const defaultSwapFunction: ElementSwapFunction =
  (parent, children, newChild) => {
    children.forEach(child => child.remove());
    parent.appendChild(newChild);
  };

export const replaceContentAtSelector =
  (
    parentSelector: string,
    newElementOrString: HTMLElement | string,
    swapFunction = defaultSwapFunction
  ): HTMLElement => {
    const newElement = isHtmlElement(newElementOrString) ? newElementOrString : htmlFromString(newElementOrString);
    const selection = document.querySelectorAll(parentSelector);
    if(selection.length < 1) {
      throw new Error(`Couldn't find any elements using the selector "${parentSelector}"`);
    }

    Array.from(selection)
      .forEach((parentElement: HTMLElement) => {
        const children = (Array.from(parentElement.children) || []) as HTMLElement[];
        swapFunction(
          parentElement, // The parent element
          children, // The parent element's children
          newElement
        );
      });
    return newElement;
  };


export const Accumulators: Record<'Circular' | 'Clamped', (acc: number, value: number, i: number) => number> =
  {
    Circular(value, change) {
      const nextValue = value + change;
      return change < 0
        ? (nextValue < 0  ? (nextValue + 1) : nextValue)
        : (nextValue >= 1 ? (nextValue - 1) : nextValue);
    },
    Clamped(value, change) {
      const nextValue = value + change;
      return change < 0
        ? (nextValue <  0 ? 0 : nextValue)
        : (nextValue >= 1 ? 1 : nextValue);
    }
  };
