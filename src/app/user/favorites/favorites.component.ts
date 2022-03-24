import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites:any[] = []
  imageKeyList:any[] = [];
  constructor(
    private db:DatabaseService
  ) { }

  ngOnInit(): void {
    this.favorites = []
    this.db.getFavImages().subscribe((response:any) => {
      response.forEach((element:any) => {
        let test:any = Object.values(element)
        console.log(test[0]['key'])
        this.favorites.push(...Object.values(element.payload.val()))
        this.imageKeyList.push(...Object.keys(element.payload.val()))
      });
      for(let i = 0; i < this.favorites.length; i++){
      this.favorites[i]['imageKey'] = this.imageKeyList[i]
    }
    console.log(this.favorites)
    })
  }
  
  deleteFromFavorites(imageKey:any, formData:any){
    this.db
  }
}
