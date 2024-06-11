import { defineStore } from 'pinia'

export const usePhotoStore = defineStore('photoStore', {
  state: () => ({
    photos: JSON.parse(localStorage.getItem('photos') || '[]')
  }),
  getters: {
    getPhotos: (state) => state.photos
  },
  actions: {
    addPhoto(photo) {
      this.photos.push(photo)
      localStorage.setItem('photos', JSON.stringify(this.photos))
    },
    deletePhoto(index) {
      this.photos.splice(index, 1)
      localStorage.setItem('photos', JSON.stringify(this.photos))
    }
  }
})
