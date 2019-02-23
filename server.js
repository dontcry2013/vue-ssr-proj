const fs = require('fs')
const LRU = require('lru-cache')
const express = require('express')

const favicon = require('serve-favicon')
const { resolve, join } = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'
const app = express()

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
const templatePath = resolve('./index.html')
if (isProd) {
	const template = fs.readFileSync(templatePath, 'utf-8')
	const bundle = require('./dist/vue-ssr-server-bundle.json')
	const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  	renderer = createRenderer(bundle, {
	    template,
	    clientManifest
	})
} else {
	// In development: setup the dev server with watch and hot-reload,
	// and create a new renderer on bundle / index template update.
	readyPromise = require('./build/setup-dev-server')(
		app, 
		templatePath, 
		(bundle, options) => {
			renderer = createRenderer(bundle, options)
		}
	)
}


app.use('/dist', express.static(join(__dirname, './dist')))
app.use(favicon(__dirname + '/dist/assets/favicon.ico'));

app.get('/json/tiles', (request, response) => {
	response.writeHead(200, { 'Content-Type': 'application/json' });

	fs.createReadStream(join(__dirname, './json/tiles.json'), {
		encoding: 'utf-8',
	})
	.pipe(response);
});

function render (req, res) {
	const s = Date.now()

	res.setHeader("Content-Type", "text/html")

	const handleError = err => {
		if (err.url) {
		  	res.redirect(err.url)
		} else if(err.code === 404) {
		  	res.status(404).send('404 | Page Not Found')
		} else {
		  	// Render Error Page or Redirect
		  	res.status(500).send('500 | Internal Server Error')
		  	console.error(`error during render : ${req.url}`)
		  	console.error(err.stack)
		}
	}

	const context = {
		title: 'Vue SSR 2.0', // default title
		url: req.url
	}
	renderer.renderToString(context, (err, html) => {
		if (err) {
		  	return handleError(err)
		}
		res.send(html)
		if (!isProd) {
		  	console.log(`whole request: ${Date.now() - s}ms`)
		}
	})
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log(`server started at localhost:${port}`)
})
