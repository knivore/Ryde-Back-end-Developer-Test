README
========================
This README would normally document whatever steps are necessary to get your application up and running.


What is this repository for?
========================
Quick summary
Version
Learn Markdown
How do I get set up?
Summary of set up


Configuration
========================
Download MySQL Workbench, create a local database 'Ryde' and modify config/config.json with your username & password. 

Database configuration & Node models setup (Manual step by step)
1. Check for new migrations:\
```npx sequelize-mig migration:make ```
2. Run migration:\
```npx sequelize-cli db:migrate```
3. Run seed:\
```npx sequelize db:seed --seed demo_user.js```


Start up (Auto)
1. Run the following in terminal:\
```npm start dev ```

How to run tests
========================
Download Postman to trigger the APIs manually


Deployment instructions
========================
In your terminal, enter: nodemon ./bin/www


Contribution guidelines
========================
Writing tests
Code review
Other guidelines
Who do I talk to?
Repo owner or admin
Other community or team contact
