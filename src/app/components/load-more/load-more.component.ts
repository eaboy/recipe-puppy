import { Component, OnInit, ElementRef, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit, OnDestroy {

  private observer: IntersectionObserver;

  @Input() margin = 100;
  @Output() loadMore = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const options: IntersectionObserverInit = {
      rootMargin: this.margin + 'px'
    };
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          this.loadMore.emit();
        }
      });
    }, options);
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.el.nativeElement);
  }

}
