#!/bin/sh

curl -X POST -F 'file=@data/office_quotes.json' http://localhost:3000/quotes/upload
