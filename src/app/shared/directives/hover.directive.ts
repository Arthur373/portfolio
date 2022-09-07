import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[hover]'
})
export class HoverDirective {

  @Input("hover") color!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    this.changeColor(this.color);
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.changeColor("");
  }

  changeColor(color: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, "background-color", color);
  }
}
