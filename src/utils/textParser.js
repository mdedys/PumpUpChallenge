export default {
  replaceHashTags: replaceHashTags,
  replaceMentions: replaceMentions
}

function replaceHashTags( text ) {
  return text.replace( /[#]+[A-Za-z0-9-_]+/g, t => {
    let hashTag = t.replace( '#', '%23' )
    return t.link( '//search.pumpup.com/tag?q=' + hashTag )
  })
}

function replaceMentions( text ) {
  return text.replace( /[@]+[A-Za-z0-9-_]+/g, t => {
    let mention = t.replace( '@', '' )
    return t.link( '//pumpup.com/mention?q=' + mention )
  })
}