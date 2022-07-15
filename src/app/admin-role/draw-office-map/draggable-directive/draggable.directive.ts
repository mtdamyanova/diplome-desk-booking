import { Directive, HostListener } from '@angular/core';
import { MapService } from '../map-service/map.service';

@Directive({
  selector: '[svgDraggable]',
})
export class DraggableDirective {
  private draggingElement: any;

  constructor(private mapService: MapService) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.draggingElement) {
      const svgPoint = this.mapService.getSVGPoint(event, this.draggingElement);
      if (svgPoint.y < 340 && svgPoint.x < 800) {
        this.setPosition(this.draggingElement, {
          x: svgPoint.x,
          y: svgPoint.y,
        });
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.draggingElement = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    this.draggingElement = null;
  }

  private setPosition(element: any, coord: { x: any; y: any }) {
    element.setAttribute('x', coord.x);
    element.setAttribute('y', coord.y);
  }
}
