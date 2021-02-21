const fs = require('fs');


const dist = '/frontend/blocks/'

const name = process.argv[2];
const blockPath = process.argv[3]?process.argv[3]:'';


if( !name ){
    console.log(`\x1b[31mNew block name doesn't provide.\x1b[0m`)  ;
    return false;
}

console.log('name: ', name);
console.log('path: ', blockPath);


const extentions = ['js','scss','twig'];

extentions.forEach((extention)=>{

    const pathFull = buildPath(dist, blockPath, name, extention);

    fs.mkdir( pathFull.dir, { recursive: true }, (err)=>{
        if(err) throw err;

        fs.writeFile( pathFull.path, pathFull.content, (err)=>{
            if(err){
                console.log(err);
            } else {
                console.log(`\x1b[32mBlock "${name}" is writen to ${pathFull.dir}.\x1b[0m`);
            }

        } )

    } );

})



function buildPath(dist, blockPath, name, extention){

    dist = dist.replace( /^\//,'');
    dist = dist.replace( /\/$/,'');
    blockPath = blockPath.replace( /^\//,'');
    blockPath = blockPath.replace( /\/$/,'');
    name = name.replace( /\//g,'');
    name = name.toLocaleLowerCase();

    let content = '';
    if( extention === 'js'){
        content = `import "./${name}.scss";`;
    } else if(extention === 'scss') {
        content = `@import "../../styles/variables";
        @import "../../styles/mixins/media";
        @import "../../styles/mixins/grid";
        @import "../../styles/mixins/helpers"`;
    }


    return {
        path: `./${dist}/${blockPath}/${name}/${name}.${extention}`.replace(/\/\/+/,'/'),
        dir: `./${dist}/${blockPath}/${name}`.replace(/\/\/+/,'/'),
        content: content
    };

}
