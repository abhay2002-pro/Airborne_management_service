This is a base node js project template, which anyone can use as it has been prepared by keeping some of the most important code principles and project management recommendation. Feel free to change anything.


`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the `src` folder

 - `config` -> In this folder, anything and everything regarding any configurations or setup of a libraray or module will be done. For example: setting up `dotenv` so that we can use the environment variables in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup your logging library that can help you to prepare meeaningful logs, comfiguration for this library should also be done here.

 - `routes` -> In this folder, we register a route and the corresponding middlewares and controllers to it.

 - `middlewares` -> They are just going to intercept the incoming requests where we can write our validators, authenticators.

 - `controllers`  - They are kind of the last middlewares as post them you can call your business layer to execute the business logic. In controllers we just receive the incoming requests and data, and then pass it to the business layer, and once business layer returns an ouput, we structure the API response object in controllers and send the output.

 - `repositories` -> This folder contains all the logic using which we interact the DB by writing quesries, all the raw queries or ORM queries will go here.

 - `services` -> contains the business logic and interacts with repositories for data from the database.

 - `utils` -> contains helper methods, error classes etc.

### Setup the project

 - Download this template from github and open it in your favourite text editor.
 - Go inside the folder path and execute the following command.
    ```
        npm install
    ```
 - In the root directory creater a `.env` file and add the follwing env variables
    ```
        PORT=<port number of your choice>
    ```
    ex:
    ```
        PORT=3000
    ```
 - Go inside the `src` folder and execute the following command:
    ```
        npx sequelize init
    ```
 - By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.
 - If you're setting up your development environment, the write the username of db, password of your db and in  dialect mention whatever db you are using for ex: mysql, mariadb etc.
 - If you're setting up test or prof environment, make sure you also replace the host with the hosted db url.
 - To run the server, execute:
    ```
        npm run dev
    ```