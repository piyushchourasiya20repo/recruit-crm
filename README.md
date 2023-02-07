## Piyush Chourasiya Api for Node js

## Installation

Clone the repository

    git clone https://github.com/piyushchourasiya20repo/recruit-crm.git

Install Node js the dependencies using npm

    npm install

Setup local dev config file .

     set node_env=local

Setup database. ( db name : "demo2") and run commands


cd sequelize-cli
sequelize db:migrate
npx sequelize-cli db:seed:all

> Note: cd  sequelize-cli folder path then run 

Run

    npm start dev

> Note: run on project root path  & before that set config file

Your server address in browser .it will run at local dev

http://localhost:9000

for api doc (Swagger) visit

http://localhost:9000/v1/doc/

## Database field description

-   first_name : It is a string type field with a maximum length of 40 characters. It is defined as not null.
-   last_name : It is a string type field with a maximum length of 40 characters. It is defined as nullable.
-   email : It is a string type field with a maximum length of 100 characters. It is defined as nullable.
-   contact_number : It is a string type field with a maximum length of 100 characters. It is defined as nullabler.
-   gender : It is an integer type field defined as nullable with a validation of being one of [1, 2].
-   specialization : It is a string type field with a maximum length of 200 characters. It is defined as nullable.
-   work_ex_year : It is a date type field defined as nullable.
-   candidate_dob : It is a big integer type field defined as nullable.
-   address : It is a string type field with a maximum length of 500 characters. It is defined as nullable.
-   skills : It is a string type field with a maximum length of 50 characters. It is defined as nullable.
-   created_on : It is a big integer type field defined as nullable.
-   updated_on : It is a big integer type field defined as nullable.
-   avatar : null.
-   resume : It is a string type field defined as nullable and contains the file format in word and pdf.