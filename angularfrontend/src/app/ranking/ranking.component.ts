import {Component, OnInit, ViewChild} from '@angular/core';
import {DropService} from '../services/drop.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
dataSource;
  displayedColumns: string[] = ['username', 'level', 'total_exp', 'profession'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserRankingOrderByLvlDesc().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
