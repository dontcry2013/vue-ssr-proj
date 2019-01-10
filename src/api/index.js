export function fetchItemApi (id) {
  	return new Promise(function(resolve, reject){
  		resolve('some fetch msg by:' + id)
  	})
}