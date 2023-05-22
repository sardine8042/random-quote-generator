#!/bin/sh

echo "==== case 1: getting a quote with no quotes in database"
echo "server response to GET /quotes/5:"
echo "$(curl -s -X GET http://localhost:3000/quotes/5 | tr -d '\r')"

echo "\n==== case 2: getting a random quote with no quotes in database"
echo "server response to GET /quotes/random:"
echo "$(curl -s -X GET http://localhost:3000/quotes/random | tr -d '\r')"

echo "\n==== case 3: uploading the quotes.json data as a file"
echo "calling POST /quotes/upload"
curl -s -X POST -F 'file=@data/office_quotes.json' http://localhost:3000/quotes/upload > /dev/null
echo "(done, but response redacted since it returns the entire list of uploaded quotes)"

echo "==== case 4: getting a specific quote after uploading data"
echo "server response to GET /quotes/5:"
echo "$(curl -s -X GET http://localhost:3000/quotes/5 | tr -d '\r')"

echo "\n==== case 5: getting a specific quote after uploading data"
echo "server response to GET /quotes/random:"
echo "$(curl -s -L -X GET http://localhost:3000/quotes/random | tr -d '\r')"
