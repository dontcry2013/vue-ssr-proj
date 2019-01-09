import { createApp } from './main.js'

export default function(context){
	return new Promise(function(resolve, reject){
		const { app, router } = createApp();

		router.push(context.url)

		router.onReady(function(){
			const matchedComponents = router.getMatchedComponents();
			if(!matchedComponents.length){
				return reject({ code: 404 })
			}
			resolve(app)
		}, reject)
	});
}