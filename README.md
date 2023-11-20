# BET API

## About
An simple API with bet function, with study finality. With this API, will can create a contest, choosing the raffle date, minimum bet numbers, the choosed the minimum, this number is how many hits to win the game and the maximum, the maximum of numbers you can choose, but hitting the minimum you win.
After created you can create tickets you will choose your numbers, where you have to match at least the mimum of the contest.

## Instructions
- Clone the repository from Github;
- Type the command `npm install` or `npm i` to install all dependences;
- Type `docker compose up -d` to create the database container;
- Type `npm run dev`
- You can run the API creating build file with `npm build` after type `npm start`
- To enter in develop just type `npm run dev`

## Routes
## Contest
- POST | /contests | Register a new Contest |  name: String,
                                              number: Number,
                                              min_number: Number,
                                              max_number: Number,
                                              prize: Number,
                                              raffle_date: Date,
- GET | /contests/one&contestNumber={integer} | Return a contest 
- GET | /contests/:contestId | Draw a game returning draw numbers 

## Ticket
 - POST | /tickets | Register a new ticket |  city: String,
                                              contest_number: Number,
                                              contestId: String,
                                              bets: Number,
- GET | /tickets/check/:ticketId/:contestId | Draw a game returning draw numbers 