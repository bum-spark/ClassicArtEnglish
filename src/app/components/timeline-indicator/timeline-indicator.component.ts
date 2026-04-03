import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

interface TimelineEpoch {
  label: string;
  shortLabel: string;
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

  epochs: TimelineEpoch[] = [
    {
      label: 'Classical Era',
      shortLabel: 'Classical',
      route: '/greece',
      routes: ['/greece', '/hercules', '/rome']
    },
    {
      label: 'Middle Ages',
      shortLabel: 'Medieval',
      route: '/medieval',
      routes: ['/medieval', '/romanesque', '/gothic']
    },
    {
      label: 'Renaissance & Baroque',
      shortLabel: 'Renaissance',
      route: '/renaissance',
      routes: ['/renaissance', '/baroque', '/neoclassicism']
    },
    {
      label: '19th Century',
      shortLabel: '19th C.',
      route: '/romanticism',
      routes: ['/romanticism', '/impressionism', '/postimpressionism']
    },
    {
      label: '20th Century',
      shortLabel: '20th C.',
      route: '/expressionism',
      routes: ['/expressionism', '/surrealism', '/postmodernism']
    },
    {
      label: 'The Future',
      shortLabel: 'Future',
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
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private updateState(url: string): void {
    this.isVisible = this.allRoutes.includes(url);
    this.activeIndex = this.epochs.findIndex(e => e.routes.includes(url));
  }
}
