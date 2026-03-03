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
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Sandro_Botticelli_-_The_return_of_Judith_to_Bethulia.jpg/800px-Sandro_Botticelli_-_The_return_of_Judith_to_Bethulia.jpg',
      description: 'Botticelli shows Judith calmly returning to Bethulia with the head of Holofernes. The mood is elegant and serene — Judith looks like a graceful young woman, almost floating. This is typical of the Renaissance: beauty over violence.',
      aspect: 'aspect-[3/4]'
    },
    {
      artist: 'Michelangelo (Sistine Chapel)',
      year: 'c. 1508-1512',
      era: 'High Renaissance',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Michelangelo%2C_Judith_and_Holofernes_01.jpg/800px-Michelangelo%2C_Judith_and_Holofernes_01.jpg',
      description: 'Michelangelo included the scene of Judith carrying Holofernes\u2019 head on the ceiling of the Sistine Chapel. The bodies are powerful and muscular — Michelangelo\u2019s signature style — turning the biblical story into a monumental statement.',
      aspect: 'aspect-square'
    },
    {
      artist: 'Peter Paul Rubens',
      year: 'c. 1616',
      era: 'Baroque',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Peter_Paul_Rubens_-_Judith_with_the_Head_of_Holofernes%2C_c._1616.jpg/800px-Peter_Paul_Rubens_-_Judith_with_the_Head_of_Holofernes%2C_c._1616.jpg',
      description: 'Rubens brings drama and fleshy realism. His Judith is powerful and sensual, with rich colors and dynamic composition typical of the Baroque era. The scene is charged with tension.',
      aspect: 'aspect-[3/4]'
    },
    {
      artist: 'Artemisia Gentileschi',
      year: 'c. 1620',
      era: 'Baroque',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Artemisia_Gentileschi_-_Judith_Beheading_Holofernes_-_WGA8563.jpg/800px-Artemisia_Gentileschi_-_Judith_Beheading_Holofernes_-_WGA8563.jpg',
      description: 'This is the most famous version. Artemisia, a woman who survived assault, painted Judith with raw power. The blood is real, the effort is real, the anger is real. She turns the biblical scene into a personal statement of justice.',
      aspect: 'aspect-[3/4]',
      featured: true
    },
    {
      artist: 'Francisco de Goya',
      year: 'c. 1819-1823',
      era: 'Romanticism',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Francisco_de_Goya_y_Lucientes_-_Judith_and_Holofernes_-_WGA10104.jpg/800px-Francisco_de_Goya_y_Lucientes_-_Judith_and_Holofernes_-_WGA10104.jpg',
      description: 'Part of Goya\u2019s \u201CBlack Paintings\u201D — dark, disturbing works painted on the walls of his own house. Judith appears as a shadow, almost ghostly, cutting through darkness. There\u2019s no beauty here — only raw horror.',
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
