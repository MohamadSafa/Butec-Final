import { Injectable, ElementRef } from '@angular/core';
import { CountUp } from 'countup.js';

@Injectable({
  providedIn: 'root'
})
export class CountUpService {
  private countUpInstances: Map<ElementRef, CountUp> = new Map();

  createCountUp(element: ElementRef, endValue: number): CountUp {
    const countUp = new CountUp(element.nativeElement, endValue);
    this.countUpInstances.set(element, countUp);
    return countUp;
  }

  updateCountUp(element: ElementRef, endValue: number): void {
    const countUp = this.countUpInstances.get(element);
    if (countUp) {
      countUp.update(endValue);
    }
  }

  startCountUp(element: ElementRef): void {
    const countUp = this.countUpInstances.get(element);
    if (countUp) {
      countUp.start();
    }
  }
}
