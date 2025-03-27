import { Component, inject, input, OnInit, signal } from '@angular/core';
import { BlogpostService } from '../../../services/blogpost.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ImageService } from '../../../../../shared/services/image.service';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{
  slug = input<string | undefined>(undefined);
  blogPostService = inject(BlogpostService);
  imageService = inject(ImageService)
  router = inject(Router);
  contentData = signal('')
  editPostForm = new FormGroup({
    title : new FormControl<string>('',
      {
        nonNullable: true, 
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(100)]
      }
    ),
    content : new FormControl<string>('', 
      {
        nonNullable: true, 
        validators: [Validators.required, Validators.maxLength(3000)]
      }
    ),
    coverImageUrl: new FormControl<string>('',
      {
        nonNullable : true,
        validators : [Validators.required]
      }
    ),
    slug : new FormControl<string>('',
      {
        nonNullable: true, 
        validators: [Validators.required]
      }
    ),
  })
  get title(){
    return this.editPostForm.controls.title
  }

  get content(){
    return this.editPostForm.controls.content
  }

  onContentChange(){
      this.contentData.set(this.editPostForm.getRawValue().content)
    }
    onCoverImageSelected(input : HTMLInputElement){
      if(!input.files || input.files.length<=0)
        return;
      const file : File = input.files[0]
      this.imageService.uploadImage(file.name, file)
        .then((snapshot)=>{
          getDownloadURL(snapshot.ref)
            .then((downloadUrl)=>{
              this.editPostForm.patchValue({
                coverImageUrl: downloadUrl
              })
              alert('Image Upload Successful')
            })
        })
    }
  onSubmit(){
    if(this.editPostForm.invalid)
        return;
    const rawValue = this.editPostForm.getRawValue();
    this.blogPostService.updateBlogPost(
      rawValue.title,
      rawValue.content,
      rawValue.coverImageUrl,
      rawValue.slug
    );
    this.router.navigateByUrl('/dashboard');
  }
  onDelete(slug : string){
    this.blogPostService.deleteBlogPostBySlug(slug);
    this.router.navigateByUrl('/dashboard');
  }
  ngOnInit(): void {
      //console.log(this.slug());
      this.blogPostService.getBlogPostBySlug(this.slug() || '').subscribe({
        next:(blogPost)=>{
          this.editPostForm.patchValue({
            title: blogPost.title,
            content: blogPost.content,
            coverImageUrl: blogPost.coverImageUrl,
            slug: blogPost.slug
          })
          this.contentData.set(blogPost.content);
          //console.log(blogPost);
        },
        error(err){
          console.log(err)
        }
      })
  }
}
