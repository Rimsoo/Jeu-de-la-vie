import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importation de CommonModule
import { FormsModule } from '@angular/forms'; // Importation de FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {
  table!: boolean[][];
  saveTabale!: boolean[][];
  TAILLE = 100;
  stop = true;
  speed = 100;

  ngOnInit(): void {
    this.reset();
  }

  switch(i: number, j: number): void {
    this.stop = true;
    this.table[i][j] = !this.table[i][j];
  }

  reset(): void {
    this.table = this.newTable();
    this.stop = true;
  }

  pause() :void {
    this.stop = true;
  }

  save() {
    this.saveTabale = this.table;
  }

  useSave() {
    this.stop = true;
    this.table = this.saveTabale;
  }

  async play(): Promise<void>{
    this.stop = false;
    while(!this.stop) {
      this.step();
      await new Promise(resolve => setTimeout(resolve, this.speed));
    }
  }

  step(): void {
    const tmpTable = this.newTable();
    const size = this.TAILLE;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const count = this.countAliveNeighbors(i, j);
        tmpTable[i][j] = (count === 3 || (this.table[i][j] && count === 2));
      }
    }

    this.table = tmpTable;
  }

  countAliveNeighbors(row: number, col: number): number {
    let count = 0;
    const size = this.TAILLE;
    const table = this.table;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const r = row + i;
        const c = col + j;

        if (!(i === 0 && j === 0) && r >= 0 && r < size && c >= 0 && c < size && table[r][c]) {
          count++;
        }
      }
    }

    return count;
  }

  newTable(): boolean[][] {
    let table = new Array(this.TAILLE);
    for(let i = 0; i < this.TAILLE; i++) {
      table[i] = new Array(this.TAILLE);
    }

    return table;
  }

}


