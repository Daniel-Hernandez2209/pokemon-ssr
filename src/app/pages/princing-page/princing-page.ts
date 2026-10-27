import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'princing-page',
  imports: [],
  templateUrl: './princing-page.html',
})
export default class PrincingPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle('Princing PAGE');
    this.meta.updateTag({ title: 'description', content: 'esta es mi Princing page' });
    this.meta.updateTag({ name: 'og:title', content: 'Princing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Princing,Angular,Pro,Curso,Hola,Mundo' });
  }
}
