import { Component, OnInit } from '@angular/core';
import { throws } from 'assert';
import { AlbomsService } from 'src/app/services/alboms.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-albom-alert',
  templateUrl: './delete-albom-alert.component.html',
  styleUrls: ['./delete-albom-alert.component.css']
})
export class DeleteAlbomAlertComponent implements OnInit {
  key:string = "";
  constructor(
    private albomsService:AlbomsService,
    private db:DatabaseService,
  ) { }

  ngOnInit(): void {
    this.key = this.albomsService.albomKey
  }
  onAlbomDelete(){
    this.db.deleteAlbom(this.key)
  }
}
