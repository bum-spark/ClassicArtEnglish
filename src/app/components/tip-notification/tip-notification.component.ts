import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tip-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tip-notification.component.html',
  styleUrl: './tip-notification.component.scss'
})
export class TipNotificationComponent implements OnInit, OnDestroy {
  isVisible = false;
  isLeaving = false;

  private showTimer: any;
  private hideTimer: any;

  private readonly SESSION_KEY = 'classicart_tip_shown';
  private readonly SHOW_DELAY = 30000;   // 30 seconds
  private readonly AUTO_HIDE_DELAY = 10000; // 10 seconds

  ngOnInit(): void {
    // Only show once per session
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(this.SESSION_KEY)) {
      return;
    }

    this.showTimer = setTimeout(() => {
      this.isVisible = true;
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(this.SESSION_KEY, 'true');
      }

      // Auto-hide after 10 seconds
      this.hideTimer = setTimeout(() => {
        this.dismiss();
      }, this.AUTO_HIDE_DELAY);
    }, this.SHOW_DELAY);
  }

  ngOnDestroy(): void {
    if (this.showTimer) clearTimeout(this.showTimer);
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }

  dismiss(): void {
    if (this.isLeaving) return;
    this.isLeaving = true;
    // Wait for the leave animation to finish
    setTimeout(() => {
      this.isVisible = false;
      this.isLeaving = false;
    }, 500);
  }
}
