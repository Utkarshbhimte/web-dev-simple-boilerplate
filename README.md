# The easiest and most developer-friendly Front-End Boilerplate for you. 

## Usage

To get started with the boilerplate, simply make sure you have [Git (Download link)](https://git-scm.com/downloads) and [Node (Download Link)](https://nodejs.org/en/download/current/) installed in your system.

Then open your terminal or command line in the folder where you want to create your new app and run these commands one by one:

1. Run `git clone https://github.com/Himujjal/web-dev-simple-boilerplate.git {Your_website_name}` here. Replace `{Your_website_name}` by your website name.
2. Then run `cd {Your_website_name}`.
3. Run `npm install && rm -rf .git`.
4. Then to finally start using the boilerplate, run `npm start`

Automatically a window will open up in the default browser showing the start page. To start with the boilerplate, simply edit `index.ejs` file.

### File Structure
1. All your ejs files should be in the `./src` folder. The `js` and `less` files for these new `ejs` files will be automatically created with a default template. 

2. All your ***reusable*** `ejs` files should in the `./src/components` folder. The `js` and `less` files for these "components" will be automatically created. 

3. You can simply write normal HTML in `ejs` files and `css` in the `less` files. To know more about how to use Re-Usable HTML with `ejs` and `less`, click on this [link](): [The Code Empire ejs-less]()


## Production Build

After you have finished building the website, run `npm run build`. You will get HTML,CSS and JS files in a folder called `dist`.

# Features

### Build **re-usable** HTML Code with e-js

Yeah, it is **ejs** supported which can help you make resusable HTML web components pretty much easier and of course the loops and if/else are there.

### Make **writing styles easier with LESS**. 

You can easily write all your CSS in LESS format.

### Multi-Page Websites.

Easily build multipage websites and deploy them instantly.

### Easy file creation with basic templates

You do not have to worry about writing a whole lot of templates and all before writing a LESS or EJS file. Simply create the file and the template will be ready for you. See the Magic!

### Hot-Reloading

Exploit the power of Hot Reloading with Webpack. Simply start your app and the browser will automatically refresh itself. 

### NPM modules support

Yes, now you can easily use NPM modules in your web application.