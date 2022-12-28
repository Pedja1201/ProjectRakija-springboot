import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/service/customers/customers.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-customers',
  templateUrl: './details-customers.component.html',
  styleUrls: ['./details-customers.component.css']
})
export class DetailsCustomersComponent implements OnInit {


  customer: any = {};

  constructor(private service: CustomersService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    let customerId = Number(this.route.snapshot.paramMap.get("id"));
    this.service.getOne(customerId).subscribe((value: any) => {
      this.customer = value;
    }, (error) => {
      console.log(error);
      this.router.navigate(["customers"]);
    });
  }

  back() {
    this.location.back();
  }

}