import { inject, Injectable } from '@angular/core';
import { Storage, uploadBytesResumable, UploadTask, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  firebaseStorage = inject(Storage);
  uploadImage(imageName : string, image: File): UploadTask{
    const storageRef = ref(this.firebaseStorage,`images/${imageName}`)
    return uploadBytesResumable(storageRef, image)
  }
}
