import { createApp } from './main.js'

export default function(context){
	return new Promise(function(resolve, reject){
		const { app, router, store } = createApp();

		router.push(context.url)

		router.onReady(function(){
			const matchedComponents = router.getMatchedComponents();
			if(!matchedComponents.length){
				return reject({ code: 404 })
			}

			Promise.all(matchedComponents.map(Component => {
				if(Component.asyncData){
					console.log('from entry-server', router.currentRoute.params)
					return Component.asyncData({
						store,
						route: router.currentRoute
					})
				}
			})).then(() => {
				context.state = store.state
				resolve(app)
			})
			
		}, reject)
	});
}