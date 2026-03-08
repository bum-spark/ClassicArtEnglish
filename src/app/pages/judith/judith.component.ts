import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-judith',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './judith.component.html',
  styleUrl: './judith.component.scss'
})
export class JudithComponent implements OnInit {
  private isBrowser: boolean;

  paintings = [
    {
      artist: 'Sandro Botticelli',
      year: 'c. 1472',
      era: 'Renaissance',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sandro_Botticelli_-_Retour_de_Judith_1.JPG/960px-Sandro_Botticelli_-_Retour_de_Judith_1.JPG',
      description: 'Botticelli shows Judith calmly returning to Bethulia with the head of Holofernes. The mood is elegant and serene \u2014 Judith looks like a graceful young woman, almost floating. This is typical of the Renaissance: beauty over violence.',
      aspect: 'aspect-[3/4]'
    },
    {
      artist: 'Michelangelo (Sistine Chapel)',
      year: 'c. 1508\u20131512',
      era: 'High Renaissance',
      image: 'https://www.artchive.com/wp-content/uploads/2024/08/sistine-chapel-ceiling-judith-carrying-the-head-of-holofernes-michelangelo-1512.jpg',
      description: 'Michelangelo included the scene of Judith carrying Holofernes\u2019 head on the ceiling of the Sistine Chapel. The bodies are powerful and muscular \u2014 Michelangelo\u2019s signature style \u2014 turning the biblical story into a monumental statement.',
      aspect: 'aspect-square'
    },
    {
      artist: 'Peter Paul Rubens',
      year: 'c. 1616',
      era: 'Baroque',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Peter_Paul_Rubens_-_Judith_with_the_Head_of_Holofernes.jpg/960px-Peter_Paul_Rubens_-_Judith_with_the_Head_of_Holofernes.jpg',
      description: 'Rubens brings drama and fleshy realism. His Judith is powerful and sensual, with rich colors and dynamic composition typical of the Baroque era. The scene is charged with tension.',
      aspect: 'aspect-[3/4]'
    },
    {
      artist: 'Artemisia Gentileschi',
      year: 'c. 1620',
      era: 'Baroque',
      image: 'https://art.newcity.com/wp-content/uploads/2013/10/Gentileschi_Judith-Slaying-Holofernes.jpg',
      description: 'This is the most famous version. Artemisia, a woman who survived assault, painted Judith with raw power. The blood is real, the effort is real, the anger is real. She turns the biblical scene into a personal statement of justice.',
      aspect: 'aspect-[3/4]',
      featured: true
    },
    {
      artist: 'Francisco de Goya',
      year: 'c. 1819\u20131823',
      era: 'Romanticism',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Judith_y_Holofernes_%28Goya%29.jpg/960px-Judith_y_Holofernes_%28Goya%29.jpg',
      description: 'Part of Goya\u2019s \u201CBlack Paintings\u201D \u2014 dark, disturbing works painted on the walls of his own house. Judith appears as a shadow, almost ghostly, cutting through darkness. There\u2019s no beauty here \u2014 only raw horror.',
      aspect: 'aspect-[3/4]'
    }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      AOS.init({ duration: 800, once: true, offset: 80 });
      window.scrollTo(0, 0);
    }
  }
}
