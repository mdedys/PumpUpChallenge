export default {
  createPhotoList: createPhotoList
}

function createPhotoList() {

  let fiveMinuteInterval = 5 * 60* 1000
  let photoList          = []
  let date               = new Date()


  for( let i = 1; i < 6; i++ ) {

    photoList.push({
      id        : i,
      link      : 'test link',
      createdAt : date
    })

    date = new Date( date.getTime() + fiveMinuteInterval )
  }

  return photoList
}