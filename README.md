# GYM API

API for an E-commerce system made with NestJs, GraphQl and PostgreSQL

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [License](#license)
- [Contact Information](#contact-information)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/SamuelB7/ecommerce_api.git
    cd ecommerce_api
    ```

2. Copy the `.env.example` to `.env` and configure your environment variables:
    ```sh
    cp .env.example .env
    ```

3. Install dependencies:
    ```sh
    yarn
    ```

4. Make sure to have Docker Compose installed on your machine.

5. Start the Docker containers:
    ```sh
    sudo docker compose up
    ```

6. Run the command below to run migrations and seed the database:
    ```sh
    yarn prisma:reset
    ```

## Usage

To start the server in development mode, without docker run:
```sh
yarn start:dev
```
The server will be running at http://localhost:3333

## Documentation

After starting the application, go to http://localhost:3333/graphql to check the GraphQl querys and mutations of the api.

## License

This project is licensed under the MIT License

## Contact Information

For any inquiries, please contact belo.samuel@gmail.com