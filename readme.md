# Security Server

In this laboratory I use SendGrid to send secured email to the network.
SendGrid is a Denver, Colorado-based customer communication platform for transactional and marketing email. 

## Installation

You need `SENDGRID_API_KEY` and `SENDGRID_EMAIL` api keys in the `.env` file.
```bash
$ npm install
$ docker-compose up --build
```

## Running the app

```bash
docker-compose up
```

## Testing

```bash
http://localhost:3000/api
```
