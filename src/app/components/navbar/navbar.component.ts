import { Component, OnInit, Inject, PLATFORM_ID, HostListener, ElementRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

interface NavLink {
  label: string;
  route: string;
}

interface NavEpoch {
  name: string;
  links: NavLink[];
}

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

  /** Desktop dropdown state */
  activeDropdown: string | null = null;
  private dropdownTimeout: any;

  /** Mobile accordion state */
  mobileExpanded: string | null = null;

  /** Desktop: active epoch submenu */
  activeEpochSubmenu: string | null = null;
  private epochSubmenuTimeout: any;

  /** Desktop: submenu opens right or left (edge detection) */
  epochSubmenuDirection: 'right' | 'left' = 'right';

  /** Mobile: expanded epoch within epochs section */
  mobileEpochExpanded: string | null = null;

  /** Introduction sub-links */
  introLinks: NavLink[] = [
    { label: 'Overview', route: '/introduction' },
    { label: 'Judith & Holofernes', route: '/judith' },
    { label: 'The Judgment of Paris', route: '/paris' },
  ];

  /** Epoch groups */
  epochs: NavEpoch[] = [
    {
      name: 'Classical Era',
      links: [
        { label: 'Greek Art', route: '/greece' },
        { label: 'Hercules', route: '/hercules' },
        { label: 'Roman Legacy', route: '/rome' },
      ]
    },
    {
      name: 'Middle Ages',
      links: [
        { label: 'The Church Rises', route: '/medieval' },
        { label: 'Romanesque Art', route: '/romanesque' },
        { label: 'Gothic Art', route: '/gothic' },
      ]
    },
    {
      name: 'Long Neoclassicism',
      links: [
        { label: 'Renaissance', route: '/renaissance' },
        { label: 'Baroque', route: '/baroque' },
        { label: 'Neoclassicism', route: '/neoclassicism' },
      ]
    },
    {
      name: '19th Century',
      links: [
        { label: 'Romanticism', route: '/romanticism' },
        { label: 'Impressionism', route: '/impressionism' },
        { label: 'Van Gogh', route: '/postimpressionism' },
      ]
    },
    {
      name: '20th Century',
      links: [
        { label: 'Expressionism & Abstract', route: '/expressionism' },
        { label: 'Surrealism & Cubism', route: '/surrealism' },
        { label: 'Postmodernism', route: '/postmodernism' },
      ]
    },
    {
      name: 'The Future',
      links: [
        { label: 'AI Art', route: '/ai-art' },
        { label: 'NFTs & Ownership', route: '/nfts' },
        { label: 'Digital Art & Gaming', route: '/digital-art' },
      ]
    }
  ];

  /** Get all epoch routes for the Epochs button highlight */
  get allEpochRoutes(): string[] {
    return this.epochs.flatMap(e => e.links.map(l => l.route));
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Close mobile menu when clicking outside the nav */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.isOpen) return;
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeMenu();
    }
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
    if (!this.isOpen) {
      this.mobileExpanded = null;
    }
  }

  closeMenu() {
    this.isOpen = false;
    this.mobileExpanded = null;
    this.activeDropdown = null;
    this.activeEpochSubmenu = null;
    this.mobileEpochExpanded = null;
  }

  /** Desktop: open dropdown on mouseenter with small delay to avoid flicker */
  openDropdown(name: string) {
    clearTimeout(this.dropdownTimeout);
    this.activeDropdown = name;
  }

  /** Desktop: close dropdown on mouseleave with delay */
  closeDropdown() {
    this.dropdownTimeout = setTimeout(() => {
      this.activeDropdown = null;
      this.activeEpochSubmenu = null;
    }, 150);
  }

  /** Mobile: toggle accordion section */
  toggleMobileSection(name: string) {
    this.mobileExpanded = this.mobileExpanded === name ? null : name;
  }

  /** Desktop: open epoch submenu on hover with edge detection */
  openEpochSubmenu(name: string, event?: MouseEvent) {
    clearTimeout(this.epochSubmenuTimeout);
    this.activeEpochSubmenu = name;
    if (this.isBrowser && event) {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      this.epochSubmenuDirection = (window.innerWidth - rect.right) < 220 ? 'left' : 'right';
    }
  }

  /** Desktop: close epoch submenu with delay */
  closeEpochSubmenu() {
    this.epochSubmenuTimeout = setTimeout(() => {
      this.activeEpochSubmenu = null;
    }, 150);
  }

  /** Mobile: toggle epoch accordion */
  toggleMobileEpoch(name: string) {
    this.mobileEpochExpanded = this.mobileEpochExpanded === name ? null : name;
  }

  /** Check if any route in a group is active */
  isGroupActive(routes: string[]): boolean {
    if (!this.isBrowser) return false;
    const currentUrl = this.router.url;
    return routes.some(r => currentUrl === r || currentUrl.startsWith(r + '/'));
  }
}
