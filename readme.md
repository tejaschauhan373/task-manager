# Shopping APIs
<br/>

## Feature

1. CRUD operation on items of main menu
2. Security by encryption of user's details 
3. CRUD operation on user and on items of cart

## Set up the Project

1. Install Node.js in your machine

2. Install node modules

   ```
   $ cd <Project Directory Name>\
   $ npm i
   ```

3. set up config.json.

    * Make duplicate file of config/example.config.env by naming it config.env.
    * Set other needed config environment

5. Project structure

    1. **Root**

       **./**

       ├── <u>`src`</u> template folder containing JS, CSS, HTML files

       ├── `package.json` package manager file

       ├── `package-lock.json` package manager file

       ├── `.gitignore` list of files and folders to be ignored in git

       ├── `README.md` Instruction file
    
    2. **/src**
        
        **./**

       ├── `config/example.config.env` configuration file

       ├── `middleware/auth.js` file for authorization file

       ├── `models` containing file for mongoose models

       ├── `router` containing files for APIs

       ├── `test` file for unit testing


## Run the Project

* Go to project directory in terminal and run the command

   ```
   npm run start 
   ```

  // will run on [localhost:3000](localhost:3000)

<hr>
