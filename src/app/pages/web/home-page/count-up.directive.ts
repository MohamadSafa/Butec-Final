import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CountUp } from 'countup.js';

@Directive({
  selector: '[appCountUp]'
})
export class CountUpDirective implements OnInit {
  @Input('appCountUp') countTo!: number; // Default value

  private observer: IntersectionObserver;

  constructor(private el: ElementRef) {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCountUp();
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    });
  }

  ngOnInit() {
    this.observer.observe(this.el.nativeElement);
  }

  private startCountUp() {
    const countUp = new CountUp(this.el.nativeElement, this.countTo);
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  }
}
