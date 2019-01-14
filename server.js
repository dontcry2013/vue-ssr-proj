const express = require('express')
const server = express()
const favicon = require('serve-favicon')
const path = require('path')
// const bundle = require('./dist/server.bundle.js')
// const renderer = require('vue-server-renderer').createRenderer({
// 	template: fs.readFileSync('./index.html', 'utf-8')
// })
const template = require('fs').readFileSync('./index.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')


const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template,
	clientManifest
})

server.use('/dist', express.static(path.join(__dirname, './dist')))
server.use(favicon(__dirname + '/dist/assets/favicon.ico'));


server.get('*', function(req, res){
	console.log(req.url)
	const context = { 
		url: req.url, 
		title: 'this is a great title', 
	}
	renderer.renderToString(context, function(err, html){
		if(err){
			console.log('[server] err: ', err)
			res.status(500).end('error has been detected')
		} else{
			res.end(html)
		}
	})

})

server.listen(8080, () => {
	console.log('Server started on port', 8080)
})
