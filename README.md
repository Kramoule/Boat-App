# Boat list

The goal of this project is to try different things with Angular and Java Spring.
Here you can login to access a list of boats. You can then delete/update them or add an new one.

## How to use

### With docker-compose

Run `docker-compose up` to run the project.

The web page will be up on port **4200** and the server on port **8080**.
It's possible to change these value in the `docker-compose.yml`

### Without docker-compose

You must have JAVA 11 and @angular/cli installed on the host

1. Go the the `server/` folder and run `./mvnw spring-boot:run` to start the backend
2. Go the the `boat-app/` folder and run `ng serve` to start the web app

## What it does

### Features

- [x] Log in or register your account on the server (via `/login` page)
- [x] Login and access the boat list
  - An Authentication Guard keeps you from accessing this page without logging in.
- [x] Read a list of boats fetched from the server.
- [x] Update, delete, add a boat and update the list.
- [x] Logout of your session.
- [ ] Let you buy your own boat (I'm not *that* good yet).

### Use Case

You launch the webapp on the default address (`http://localhost:4200/`) and are redirected to the login page (`/login`).  
You input your username and password and choose to login or to register.

In any case, a default user is already registered:

- **username**: admin
- **password**: password

If you sign up, the app will tell you if the process has been successfully completed. Otherwise, an error will be displayed.  
After logging in, the server sends the client a JWT (JSON Web Token) that's used to verify if a user is authenticated.  
An Authentication Guard keeps you from accessing the boat list page without this token.  
You are then redirected to the boat list page (`/boat-list`).

You can now click on a boat to have more info on it, to update it or to delete it.  
Under the list, buttons allow you to add a new boat or to logout from your session and go back to the login screen.

### Server

#### Main technologies

- Bcrypt (for password hashing)
- JWT (for user authentication)
- JPA (Java Persistence API) & H2 (for quick database setup and abstraction)

The backend server can be accessed on `localhost:8080/`.  
The boats and users databases are stored **in-memory**, which means they will be reset when restarting the server.

Different REST routes are available:

|  Paths  |  Method  | Function |
|:-------:|:--------:|:--------:|
| `/boats`| **GET**  | Returns the whole list of boats |
| `/boats`| **POST** | Add a new boat to the list  |
| `/boats/{id}`| **PUT**  | Update a boat |
| `/boats/{id}`| **DELETE**  | Delete a boat |
| `/login`| **POST**  | Login with credentials (username, password) |
| `/register`| **POST**  | Register with credentials (username, password) |
| `/verify`| **GET**  | Check if JWT token is valid |

## TODO

- [x] Add validators to login inputs
- [ ] Write tests
