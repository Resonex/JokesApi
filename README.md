# Joke API – Practice all REST methods

A simple joke API you can use to learn `GET`, `POST`, `PUT`, `DELETE` and more.

## Base URL (when hosted on Vercel)
`https://your-project.vercel.app/api/jokes`

## Endpoints

| Method   | Endpoint            | Description                     |
|----------|---------------------|---------------------------------|
| GET      | /api/jokes          | Get all jokes (optional `?category=dad`) |
| GET      | /api/jokes/random   | Get a random joke               |
| GET      | /api/jokes/{id}     | Get a single joke by ID         |
| POST     | /api/jokes          | Create a new joke               |
| PUT      | /api/jokes/{id}     | Update a joke                   |
| DELETE   | /api/jokes/{id}     | Delete a joke                   |

## Example Requests (using `curl`)

```bash
# Get all jokes
curl https://your-project.vercel.app/api/jokes

# Get jokes in the "dad" category
curl "https://your-project.vercel.app/api/jokes?category=dad"

# Get a random joke
curl https://your-project.vercel.app/api/jokes/random

# Get joke with ID 1
curl https://your-project.vercel.app/api/jokes/1

# Create a new joke (POST)
curl -X POST https://your-project.vercel.app/api/jokes \
  -H "Content-Type: application/json" \
  -d '{"content":"Why do programmers prefer dark mode? Because light attracts bugs!","category":"tech"}'

# Update a joke (PUT)
curl -X PUT https://your-project.vercel.app/api/jokes/1 \
  -H "Content-Type: application/json" \
  -d '{"category":"puns"}'

# Delete a joke
curl -X DELETE https://your-project.vercel.app/api/jokes/1
