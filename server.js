const express = require('express')
const server = express()
const favicon = require('serve-favicon')
const fs = require('fs')
const path = require('path')
const bundle = require('./dist/server.bundle.js')
const renderer = require('vue-server-renderer').createRenderer({
	template: fs.readFileSync('./index.html', 'utf-8')
})


// const { createBundleRenderer } = require('vue-server-renderer')
// const renderer = createBundleRenderer(bundle, {
// 	runInNewContext: false,
// 	template: fs.readFileSync('./index.html', 'utf-8'),
// })

server.use('/dist', express.static(path.join(__dirname, './dist')))
server.use(favicon(__dirname + '/dist/assets/favicon.ico'));


server.get('*', function(req, res){
	console.log(req.url)
	bundle.default({ url: req.url }).then(function(app){
		const context = {
			title: 'this is a great title',
		}
		renderer.renderToString(app, context, function(err, html){
			if(err){
				res.status(500).end('error has been detected')
			} else{
				res.end(html)
			}
		}); //end of renderer
	}, function(err){
		console.log('reject', err)
		res.end('the sevrver can not solve the request, code:' + err.code)
	})
})

server.listen(8080)
