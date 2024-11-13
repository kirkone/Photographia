import { build, defineConfig } from 'vite'

export default defineConfig({
    base: './',
    root: "./src",
    build:{
        outDir: "../../../build/site"
    }
})