import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BlogpostService } from '../../services/blogpost.service';
import { MarkdownModule } from 'ngx-markdown';
import { ImageService } from '../../../../shared/services/image.service';
import { getDownloadURL } from '@angular/fire/storage';
@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  blogPostService = inject(BlogpostService)
  imageService = inject(ImageService)
  contentData = signal('')
  createPostForm = new FormGroup({
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
    )
  })

  get title(){
    return this.createPostForm.controls.title
  }

  get content(){
    return this.createPostForm.controls.content
  }

  onSubmit(){
    if(this.createPostForm.invalid){
      return;
    }
    this.blogPostService.createBlogPost(this.createPostForm.getRawValue().title, this.createPostForm.getRawValue().content, this.createPostForm.getRawValue().coverImageUrl)
    alert('Data Saved Successfully')
    this.createPostForm.reset()
  }

  onContentChange(){
    this.contentData.set(this.createPostForm.getRawValue().content)
  }
  onCoverImageSelected(input : HTMLInputElement){
    if(!input.files || input.files.length<=0)
      return;
    const file : File = input.files[0]
    this.imageService.uploadImage(file.name, file)
      .then((snapshot)=>{
        getDownloadURL(snapshot.ref)
          .then((downloadUrl)=>{
            this.createPostForm.patchValue({
              coverImageUrl: downloadUrl
            })
            alert('Image Upload Successful')
          })
      })
  }
}
