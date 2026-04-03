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
  private isBrowser: boolean;
  private clickHandler!: (e: Event) => void;
  private keyHandler!: (e: KeyboardEvent) => void;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.clickHandler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && target.closest('main')) {
        const img = target as HTMLImageElement;
        // Don't lightbox tiny icons/decorative images
        if (img.naturalWidth < 100 || img.naturalHeight < 100) return;
        this.imageSrc = img.src;
        this.imageAlt = img.alt || 'Image';
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
      }
    };

    this.keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
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
    document.body.style.overflow = '';
  }
}
