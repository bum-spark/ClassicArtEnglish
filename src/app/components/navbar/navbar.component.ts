import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isOpen = false;
  isScrolled = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  ngOnInit(): void {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
