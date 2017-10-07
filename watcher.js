const webpack = require('webpack');
var hound = require('hound');
var fs = require('fs');
var extfs = require('extfs');

function contains(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function getAllComponents() {
    return fs.readdirSync('src/components')
        .filter(function (comp) {
            return fs.lstatSync('src/components/' + comp).isFile()
        })
        .map(function (comp) {
            return (comp.substring(0, comp.length - 4));
        });
}

function getAllModules() {
    return fs.readdirSync('src')
        .filter(function (modul) {
            return fs.lstatSync('src/' + modul).isFile()
        })
        .map(function (modul) {
            return (modul.substring(0, modul.length - 4));
        });
}

var moduls = getAllModules(),
    components = getAllComponents();
var origContent = JSON.stringify({
    modules: moduls,
    components: components
});
var jsonContent = fs.readFileSync('webpack.config.json', 'utf8');

if (jsonContent !== origContent) {
    fs.writeFileSync('webpack.config.json', origContent);
}


var watcher = hound.watch('src', {
    persistent: true
});

watcher.on('create', function (file, stats) {
    console.log(file + '-------------was created----------')
    if (file.substring(file.length - 4, file.length) === '.ejs') {
        var fileShort = file.substring(4, file.length - 4);
        if (fileShort.substring(0, 11) === 'components\\') fileShort = fileShort.substring(11, fileShort.length)
        if (!fs.existsSync("src/js/" + fileShort + '.js')) {
            fs.writeFileSync('./src/js/' + fileShort + '.js', 'import "../styles/' + fileShort + '.less";\n//\tStart Writing Javascript below this line\n');
            console.log('New Module File Created in "js" folder named: ' + fileShort + '.js');
        }
        if (!fs.existsSync("src/styles/" + fileShort + '.less')) {
            fs.writeFileSync('./src/styles/' + fileShort + '.less', '.' + fileShort + '{\n\t/* Include all your LESS Styles inside this*/\n\n}')
            console.log('New Module File Created in "styles" folder named: ' + fileShort + '.less');
        }
        if (file.substring(4, 14) !== 'components' && extfs.isEmptySync(file)) {
            fs.writeFileSync(file, "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset='UTF-8'>\n\t<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n\t<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n\t<title>" + fileShort + "</title>\n</head>\n<body class=\"" + fileShort + "\">\n</body>\n</html>")
            console.log('Default Template created in Components/' + file + '.ejs');
        }
        if (file.substring(4, 14) === 'components' && extfs.isEmptySync(file)) {
            fs.writeFileSync(file, "<div class=\"" + file + "\">\n<!--Start writing your HTML here-->\n</div>")
            console.log('Default Template created in ' + file + '.ejs');
        }
        var modules = getAllComponents(),
            components = getAllComponents();
        var content = JSON.stringify({
            modules: modules,
            components: components
        });
        fs.writeFileSync('webpack.config.json', content);
    }
})

watcher.on('delete', function (file, stats) {
    var modules = getAllModules();
    var components = getAllComponents();
    console.log(modules + '-' + components);
    console.log(file + '--------------was deleted-----------')

    fs.readdirSync('./src/js').forEach(function (file) {
        if (!contains(modules.concat(components), file.substring(0, file.length - 3))) {
            fs.unlinkSync('./src/js/' + file);
            console.log('Deleted File: js/', file);
        }
    })
    fs.readdirSync('./src/styles').forEach(function (file) {
        if (!contains(modules.concat(components), file.substring(0, file.length - 5))) {
            fs.unlinkSync('./src/styles/' + file);
            console.log('Deleted File: js/', file);
        }
    })
    var modules = getAllComponents(),
        components = getAllComponents();
    var content = JSON.stringify({
        modules: modules,
        components: components
    });
    fs.writeFileSync('webpack.config.json', content);
})
