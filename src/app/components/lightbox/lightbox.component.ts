import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent implements OnInit, OnDestroy {
  isOpen = false;
  imageSrc = '';
  imageAlt = '';
  zoomLevel = 1;
  translateX = 0;
  translateY = 0;
  private isBrowser: boolean;
  private clickHandler!: (e: Event) => void;
  private keyHandler!: (e: KeyboardEvent) => void;

  /** Drag state */
  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private startTranslateX = 0;
  private startTranslateY = 0;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.clickHandler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && target.closest('main')) {
        const img = target as HTMLImageElement;
        if (img.naturalWidth < 100 || img.naturalHeight < 100) return;
        this.imageSrc = img.src;
        this.imageAlt = img.alt || 'Image';
        this.zoomLevel = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
      }
    };

    this.keyHandler = (e: KeyboardEvent) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === '+' || e.key === '=') this.zoomIn();
      if (e.key === '-') this.zoomOut();
    };

    document.addEventListener('click', this.clickHandler);
    document.addEventListener('keydown', this.keyHandler);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    document.removeEventListener('click', this.clickHandler);
    document.removeEventListener('keydown', this.keyHandler);
  }

  close(): void {
    this.isOpen = false;
    this.zoomLevel = 1;
    this.translateX = 0;
    this.translateY = 0;
    document.body.style.overflow = '';
  }

  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + 0.5, 5);
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - 0.5, 1);
    if (this.zoomLevel === 1) {
      this.translateX = 0;
      this.translateY = 0;
    }
  }

  resetZoom(): void {
    this.zoomLevel = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  onPointerDown(event: PointerEvent): void {
    if (this.zoomLevel <= 1) return;
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.startTranslateX = this.translateX;
    this.startTranslateY = this.translateY;
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;
    this.translateX = this.startTranslateX + (event.clientX - this.dragStartX);
    this.translateY = this.startTranslateY + (event.clientY - this.dragStartY);
  }

  onPointerUp(): void {
    this.isDragging = false;
  }

  /** Double-tap/click to toggle zoom */
  onDoubleTap(): void {
    if (this.zoomLevel > 1) {
      this.resetZoom();
    } else {
      this.zoomLevel = 2.5;
    }
  }

  get imageTransform(): string {
    return `scale(${this.zoomLevel}) translate(${this.translateX / this.zoomLevel}px, ${this.translateY / this.zoomLevel}px)`;
  }
}
