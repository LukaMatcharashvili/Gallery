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
    this.favorites = [];
    this.imageKeyList = [];
    this.loadFavoriteImages()
  }
  loadFavoriteImages(){
    this.favorites = []
    this.imageKeyList = []
    this.db.getFavImages().subscribe((response:any) => {
      response.forEach((element:any) => {
        this.favorites.push(...Object.values(element.payload.val()))
        this.imageKeyList.push(...Object.keys(element.payload.val()))
      })
      for(let i = 0; i < this.favorites.length; i++){
        this.favorites[i]['imageKey'] = this.imageKeyList[i]
      }
      this.favorites = this.favorites.filter((c:any) => c.favorite == true)
    })
  }
  deleteFromFavoritesBtnClick(imageKey:any, albomKey:any, index:any){
    let rem = this.db.removeOrAddFavImage(albomKey, imageKey)
    setTimeout(() => {
      this.imageKeyList = []
      this.favorites = [];
      rem.unsubscribe()
      this.favorites.splice(index, 1)
    }, 1)
  }
}
