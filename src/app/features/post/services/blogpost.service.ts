import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { BlogPostHelper } from '../../../core/helpers/blogpost-helper';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  firestore = inject(Firestore);
  createBlogPost(title: string, content: string, coverImageUrl: string){
      //addDoc
  
      // const postCollectionRef = collection(this.firestore, 'blog-posts');
      // addDoc(postCollectionRef, {
      //   title : this.createPostForm.value.title,
      //   content : this.createPostForm.value.content,
      //   publishedOn : new Date()
      // })
  
      //setDoc
      const postCollectionRef = doc(this.firestore, 'blog-posts', BlogPostHelper.createSlug(title))
      setDoc(postCollectionRef, {
        title : title,
        content : content,
        coverImageUrl : coverImageUrl,
        publishedOn : new Date()
      })
  }
  getBLogPosts(): Observable<BlogPost[]>{
    const blogPostCollectionRef = collection(this.firestore, 'blog-posts')
    return collectionData(blogPostCollectionRef,{
      idField: 'slug'
    }) as Observable<BlogPost[]>
  }
}
