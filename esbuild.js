import esbuild from 'esbuild';

esbuild
	.context({
		entryPoints: ['src/index.ts'],
		outfile: 'dist/bundle.js',
		bundle: true,
		minify: true,
		sourcemap: true,
		logLevel: 'info'
	})
	.then(ctx => ctx.serve({ servedir: 'dist' }));
