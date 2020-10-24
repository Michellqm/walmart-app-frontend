import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../domain/Products';
import Swal from 'sweetalert2'

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
  notFoundFlag: boolean = false;
  constructor(private productsService : ProductsService) { }

  ngOnInit() {
  }

  searchItem(item:string) {
    if(/^\d+$/.test(item)){
      this.productsService.getById(item).subscribe(
        rs => {
          if(rs != null){
            this.productList.push(rs);
            this.brandList.push(rs.brand);
            this.notFoundFlag = false;
          }else {
            this.notFoundFlag = true;
          }
        },
        err =>{
          Swal.fire('Oops...', 'Something went wrong!', 'error')
        }
      );
    }else if(item.length > 2) {
      this.discountFlag = this.isPalindrome(item);
      this.productsService.getByText(item, String(this.discountFlag)).subscribe(
        rs => {
          if(rs.length >0){
            this.notFoundFlag = false;
            this.productList = rs;
            this.brandList = rs.map(product => product.brand).filter((value, index, self) => self.indexOf(value) === index);
          }else{
            this.notFoundFlag = true;
          }
        },
        err =>{
          Swal.fire('Oops...', 'Something went wrong!', 'error')
        }
      );
    }else {
      Swal.fire('Oops...', 'Your string is too short, try with at least 3 characters!', 'warning')
    }
   
  }

  isPalindrome(item: string) {
    let reverseWord = item.split("").reverse().join("");
    return (item == reverseWord)
  }

}
