function getRandomInt(min, max) {
  return ~~(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0,i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
    //console.log( arr[i] + ' ' + arr[j])
  }
  return _arr
}
