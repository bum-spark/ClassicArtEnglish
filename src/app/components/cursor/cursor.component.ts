import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: '<div class="custom-cursor" id="custom-cursor"></div>',
  styles: []
})
export class CursorComponent implements OnInit, OnDestroy {
  private cursor: HTMLElement | null = null;
  private initCursor = false;
  private isBrowser: boolean;
  private isTouchDevice = false;

  private onMouseMove = (e: MouseEvent) => {
    if (!this.cursor || this.isTouchDevice) return;
    if (!this.initCursor) {
      gsap.to(this.cursor, { duration: 0.3, opacity: 1 });
      this.initCursor = true;
    }
    gsap.to(this.cursor, { duration: 0, top: e.clientY, left: e.clientX });
  };

  private onMouseOut = () => {
    if (!this.cursor || this.isTouchDevice) return;
    gsap.to(this.cursor, { duration: 0.3, opacity: 0 });
    this.initCursor = false;
  };

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Detect if primary input is NOT a mouse (i.e. touch-only device)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    this.isTouchDevice = !hasFinePointer;

    // On touch devices: hide cursor element, restore default cursor, skip all listeners
    if (this.isTouchDevice) {
      const cursorEl = document.getElementById('custom-cursor');
      if (cursorEl) cursorEl.style.display = 'none';
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
      // Remove cursor:none from all elements for touch devices
      const style = document.createElement('style');
      style.textContent = '* { cursor: auto !important; }';
      document.head.appendChild(style);
      return;
    }

    setTimeout(() => {
      this.cursor = document.getElementById('custom-cursor');
      if (!this.cursor) return;

      const links = document.querySelectorAll('a, button, [data-cursor-grow]');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          this.cursor?.classList.add('custom-cursor--active');
        });
        link.addEventListener('mouseleave', () => {
          this.cursor?.classList.remove('custom-cursor--active');
          this.cursor?.classList.remove('custom-cursor--text');
        });
      });

      const textElements = document.querySelectorAll('h1, h2, h3, [data-cursor-text]');
      textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.cursor?.classList.add('custom-cursor--text');
        });
        el.addEventListener('mouseleave', () => {
          this.cursor?.classList.remove('custom-cursor--text');
        });
      });

      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseout', this.onMouseOut);
    }, 100);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseout', this.onMouseOut);
  }
}
