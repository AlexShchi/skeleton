const fs = require('fs');

const src = './frontend/favicon/favicon.svg';
const dest = "./public/assets/images/favicons/";
const rootPath = './public/'

var favicons = require('favicons'),
    source = src,                     // Source image(s). `string`, `buffer` or array of `string`
    configuration = {
        path: dest.replace('.',''),                                // Path for overriding default icons path. `string`
        appName: null,                            // Your application's name. `string`
        appShortName: null,                       // Your application's short_name. `string`. Optional. If not set, appName will be used
        appDescription: null,                     // Your application's description. `string`
        developerName: null,                      // Your (or your developer's) name. `string`
        developerURL: null,                       // Your (or your developer's) URL. `string`
        dir: "auto",                              // Primary text direction for name, short_name, and description
        lang: "en-US",                            // Primary language for name and short_name
        background: "#fff",                       // Background colour for flattened icons. `string`
        theme_color: "#fff",                      // Theme color user for example in Android's task switcher. `string`
        appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
        display: "standalone",                    // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
        orientation: "any",                       // Default orientation: "any", "natural", "portrait" or "landscape". `string`
        scope: "/",                               // set of URLs that the browser considers within your app
        start_url: "/?homescreen=1",              // Start URL when launching the application from a device. `string`
        version: "1.0",                           // Your application's version string. `string`
        logging: false,                           // Print logs to console? `boolean`
        pixel_art: false,                         // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
        loadManifestWithCredentials: false,       // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
        icons: {
            // Platform Options:
            // - offset - offset in percentage
            // - background:
            //   * false - use default
            //   * true - force use default, e.g. set background for Android icons
            //   * color - set background for the specified icons
            //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
            //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
            //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
            //
            android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            coast: true,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            yandex: true                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        }
    },
    callback = function (error, response) {
        if (error) {
            console.log(error.message); // Error description e.g. "An unknown error has occurred"
            return;
        }
        // console.log(response.images);   // Array of { name: string, contents: <buffer> }
        // console.log(response.files);    // Array of { name: string, contents: <string> }
        // console.log(response.html);     // Array of strings (html elements)


        fs.access(dest, (err) => {
            if (err) {

                fs.mkdir(dest, {recursive: true}, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        write( response);
                    }
                });

            } else {
                write( response);
            }
        })

    };

favicons(source, configuration, callback);

function write(response){

    // Массив иконок, которые нужно скопировать в корень
    const toRoot = ['favicon.ico', 'apple-touch-icon.png'];

    if (response.images.length) {

        // Записываем полученные изображения
        response.images.forEach((image)=>{

            // console.log(image.name);

            fs.writeFile(dest + image.name , image.contents, function(err){
                if(!err){
                    return false;
                }
            });

            if( toRoot.indexOf(image.name) >-1 ){

                fs.writeFile( rootPath + image.name , image.contents, function(err){
                    if(!err){
                        return false;
                    }
                    console.log(`Write ${image.name} to root path`);
                });
            }
        })

    } else {
        console.log('Фавиконы не сгенерированы');
    }

    // Замисываем файлы с описанием фавиконок для разных устройств (manifest, json)
    if (response.files) {
        response.files.forEach((file)=>{
            fs.writeFile(dest + file.name , clearFromPublic( file.contents ), function(err){
                if(!err){
                    return false;
                }
            });
        })
    } else {
        console.log('Файлы описаний не сгенерированы');
    }

    // Записываем файл twig с подключением фавиконок для дальнейшей сборки
    if (response.html) {

        let str = '';
        response.html.forEach((item)=>{
            str += clearFromPublic(item);
            str += '\n';
        })
            fs.writeFile('./frontend/html/base/favicon.twig' , str, function(err){
            if(!err){
                return false;
            }
        });

    } else {
        console.log('HTML не сгенерирован');
    }
}

// убираем назание публичной папки из пути, чтобы итоговый путь был от корня сайта
function clearFromPublic(str){
    return str.replace( /\/public\//g, '/');
}

// TODO: Настрой вывод подключения фавиконок так, чтобы валидатор не выдавал предупреждений и ошибок.
