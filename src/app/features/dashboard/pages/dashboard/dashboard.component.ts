import { Component, computed, inject } from '@angular/core';
import { DashboardStatisticsComponent } from './components/dashboard-statistics/dashboard-statistics.component';
import { BlogpostService } from '../../../post/services/blogpost.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [DashboardStatisticsComponent, DatePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  blogPostService = inject(BlogpostService);
  blogPosts = toSignal(this.blogPostService.getBLogPosts());
  totalBlogPosts = computed(()=>{
    return this.blogPosts()?.length || 0
  })
  converTimeStampToDate(timestamp: Timestamp | undefined): Date | null {
    if (timestamp) {
      return timestamp.toDate();
    }
    return null; // Ensures all paths return something
  }
}