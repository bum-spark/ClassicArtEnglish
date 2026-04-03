import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

interface TimelineEpoch {
  label: string;
  shortLabel: string;
  years: string;
  route: string;
  routes: string[];
}

@Component({
  selector: 'app-timeline-indicator',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './timeline-indicator.component.html',
  styleUrl: './timeline-indicator.component.scss'
})
export class TimelineIndicatorComponent implements OnInit, OnDestroy {
  private isBrowser: boolean;
  private routerSub!: Subscription;
  isVisible = false;
  activeIndex = -1;

  /** Mobile: tapped dot index */
  tappedIndex: number | null = null;
  leavingIndex: number | null = null;

  /** Mobile: epoch name flash when navigating to new epoch */
  showEpochFlash = false;
  flashLabel = '';
  private flashTimeout: any;
  private lastFlashedIndex = -1;

  epochs: TimelineEpoch[] = [
    {
      label: 'Classical Era',
      shortLabel: 'Classical',
      years: '800 BC — 476 AD',
      route: '/greece',
      routes: ['/greece', '/hercules', '/rome']
    },
    {
      label: 'Middle Ages',
      shortLabel: 'Medieval',
      years: '500 — 1400',
      route: '/medieval',
      routes: ['/medieval', '/romanesque', '/gothic']
    },
    {
      label: 'Renaissance & Baroque',
      shortLabel: 'Renaissance',
      years: '1400 — 1800',
      route: '/renaissance',
      routes: ['/renaissance', '/baroque', '/neoclassicism']
    },
    {
      label: '19th Century',
      shortLabel: '19th C.',
      years: '1800 — 1899',
      route: '/romanticism',
      routes: ['/romanticism', '/impressionism', '/postimpressionism']
    },
    {
      label: '20th Century',
      shortLabel: '20th C.',
      years: '1900 — 1999',
      route: '/expressionism',
      routes: ['/expressionism', '/surrealism', '/postmodernism']
    },
    {
      label: 'The Future',
      shortLabel: 'Future',
      years: '2000 — Today',
      route: '/ai-art',
      routes: ['/ai-art', '/nfts', '/digital-art']
    }
  ];

  /** All epoch routes flattened for visibility check */
  private allRoutes: string[];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.allRoutes = this.epochs.flatMap(e => e.routes);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.updateState(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.updateState(e.urlAfterRedirects || e.url);
      });

    // Close tapped dot on outside click (with fade-out)
    document.addEventListener('click', this.onOutsideClick);
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    if (this.isBrowser) {
      document.removeEventListener('click', this.onOutsideClick);
      clearTimeout(this.flashTimeout);
    }
  }

  private onOutsideClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.timeline-mobile') && this.tappedIndex !== null) {
      this.closeMobilePopup();
    }
  };

  /** Close mobile popup with fade-out animation */
  private closeMobilePopup(): void {
    if (this.tappedIndex === null) return;
    this.leavingIndex = this.tappedIndex;
    this.tappedIndex = null;
    setTimeout(() => {
      this.leavingIndex = null;
    }, 250);
  }

  private updateState(url: string): void {
    const oldIndex = this.activeIndex;
    this.isVisible = this.allRoutes.includes(url);
    this.activeIndex = this.epochs.findIndex(e => e.routes.includes(url));

    // Flash epoch name on mobile when entering a new epoch
    if (this.isVisible && this.activeIndex !== -1 && this.activeIndex !== oldIndex) {
      this.flashLabel = this.epochs[this.activeIndex].label;
      this.showEpochFlash = true;
      this.lastFlashedIndex = this.activeIndex;
      clearTimeout(this.flashTimeout);
      this.flashTimeout = setTimeout(() => {
        this.showEpochFlash = false;
      }, 2500);
    }
  }

  /** Mobile: tap a dot to show its name */
  onMobileDotTap(index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.tappedIndex === index) {
      // Second tap on same → close
      this.closeMobilePopup();
    } else {
      this.tappedIndex = index;
      this.leavingIndex = null;
    }
  }

  /** Mobile: navigate when tapping the label/button */
  onMobileLabelTap(index: number): void {
    // Don't navigate if already on this epoch
    if (index === this.activeIndex) {
      this.closeMobilePopup();
      return;
    }
    this.tappedIndex = null;
    this.leavingIndex = null;
    this.router.navigate([this.epochs[index].route]);
  }
}

