So basically, you type http://localhost:3000/api/(the path of the API endpoint's folder). It should run the sql query inside.

I made a folder to create the tables. Doubt we will have to use them again but it doesnt hurt to keep them there

Im thinking we have a create-user endpoint, takes name, phone number, and balance as a parameter and inserts it into the database.
This happens when a new user logs in or if you put in a phone number thats not in the system


If they are not in the system then perhaps their user is in a pending state? name is blank? 

idk but we need to figure something out where there is a phone number and balance on the user, but no name yet

TODO:
update database with new schema
add user api endpoint
add transaction api endpoint


NEW DATABASE SCHEMA 

users
phone_number varchar(255)
name (str)

transactions
owed_to varchar(255) phone_number
owed_by varchar(255) phone_number
description varchar(500)
amount float(10)
recieved_date date 
completed_date date
active bool
