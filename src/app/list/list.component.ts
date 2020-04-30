import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent{
  title= '登录';
  products=[
    {name:'kankan'},
    {name:'kankan'},
    {name:'kankan'},
    {name:'kankan'},
  ];
}
