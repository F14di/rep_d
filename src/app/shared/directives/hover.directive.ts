import { Directive, HostListener, Input, ElementRef, Renderer2, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit{


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

    @Input() defaultColor = 'gray';
    @Input() highlight: string;


    @HostBinding('style.color') color: string = this.defaultColor;

    ngOnInit(): void{
      this.color = this.defaultColor;
    }


    @HostListener('mouseenter') mouseover(): void{
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'blue');
      this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1.1)');

      this.color = this.highlight;
    }

    @HostListener('mouseleave') mouseleave(): void{
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'transparent');
      this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1)');

      this.color = this.defaultColor;
    }


    @HostListener('dragover', ['$event']) onDragOver(evt) {
      console.log('jhere')
      // evt.preventDefault();
      // evt.stopPropagation();
      // this.fileOver = true;
    }


}
