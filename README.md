# Random Quote Generator

## Installation

This repo uses [pre-commit](https://pre-commit.com/) to run various lint filters. Run `make install` to set up the
git hooks and pre-commit environment (optional).

## Makefile targets

- `make test` - runs the jest unit tests
- `make demo` (requires Docker) - uses docker compose to spin up a server, then calls `./scripts/run_demo.sh` to run various commands.

The `make up` command is available as well to just run the server. If Docker is not available locally, run
`yarn run start` to run the application locally.

## API and design discussion

This application implements the following API:

- `POST /quotes` - upload a quote
- `POST /quotes/upload` - upload a quotes file (the "extra feature")
- `GET /quotes` - get all quotes
- `GET /quotes/<quote_id>` - get a specific quote
- `GET /quotes/random` - redirects to a random quote

`PATCH` and `DELETE` are considered out of scope for now.

A redirect seemed more natural than directly returning random quote data.

One design trade-off I would like to specifically call out is in the choice of ID in the quotes database. Because
`quotes.json` specifically contains the "quotes_id" field , it appeared to be a specific user requirement to enable
uploading the quote IDs and using incremental integers as the primary index. In general, this is a terrible idea.

If given a chance to rectify this, I would strongly suggest using a different method for ID representation, perhaps UUID
if readable URLs are not a huge concern.

## Python implemetation

Just for fun, I thought I'd throw in how I would implement this in Python if I needed to quickly prototype something
(see `./python`). I hope you'll agree it's a lot less code to write :-).
