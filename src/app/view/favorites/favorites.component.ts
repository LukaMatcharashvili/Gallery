import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites:any[] = []
  constructor(
    private db:DatabaseService
  ) { }

  ngOnInit(): void {
    this.favorites = []
    this.db.getFavImages().subscribe((response:any) => {
      response.forEach((element:any) => {
        this.favorites.push(...Object.values(element.payload.val()))
      })
      this.favorites = this.favorites.filter((c:any) => c.favorite == true)
    })
  }
}
