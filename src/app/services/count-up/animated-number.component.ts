import { Component, AfterViewInit, ElementRef, Input, ViewChild, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CountUpService } from './count-up.service';

@Component({
  selector: 'app-animated-number',
  template: `<span #countUpElement></span>{{ suffix }}`
})
export class AnimatedNumberComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() endValue: number = 0;
  @Input() suffix: string = '';
  @ViewChild('countUpElement', { static: true }) countUpElement!: ElementRef;
  private observer!: IntersectionObserver;

  constructor(private countUpService: CountUpService) {}

  ngAfterViewInit(): void {
    this.initObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['endValue'] && !changes['endValue'].firstChange) {
      this.updateAnimation();
    }
  }

  private initObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startAnimation();
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    this.observer.observe(this.countUpElement.nativeElement);
  }

  private startAnimation() {
    const countUp = this.countUpService.createCountUp(this.countUpElement, this.endValue);
    countUp.start();
  }

  private updateAnimation() {
    this.countUpService.updateCountUp(this.countUpElement, this.endValue);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
