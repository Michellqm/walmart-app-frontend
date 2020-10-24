import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormControl } from '@angular/forms';
import { Products } from '../../domain/Products';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  p: number = 1;
  productList: Array<Products> = new Array<Products>();
  brandList: Array<string> = new Array<string>();
  discountFlag: boolean = false;
  constructor(private productsService : ProductsService) { }

  ngOnInit() {
  }

  searchItem(item:string) {
    if(/^\d+$/.test(item)){
      this.productsService.getById(item).subscribe(
        rs => {
          this.productList.push(rs);
          this.brandList.push(rs.brand);
        },
        err =>{
          console.log("there was an error");
        }
      );
    }else if(item.length > 2) {
      this.discountFlag = this.isPalindrome(item);
      this.productsService.getByText(item, String(this.discountFlag)).subscribe(
        rs => {
          this.productList = rs;
          this.brandList = rs.map(product => product.brand).filter((value, index, self) => self.indexOf(value) === index);
        },
        err =>{
          console.log("there was an error");
        }
      );
    }else {
      alert("string too short");
    }
   
  }

  isPalindrome(item: string) {
    let reverseWord = item.split("").reverse().join("");
    return (item == reverseWord)
  }

}
