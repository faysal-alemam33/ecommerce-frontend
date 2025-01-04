import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  email: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email'); 
  }

}
