import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import List for type hinting and BaseModel for data validation
from typing import (
    List,
)  # We use List to specify that our Fruits model will contain a list of Fruit objects. This helps with type checking and code clarity.
from pydantic import (
    BaseModel,
)  # BaseModel is used to define data models that FastAPI can automatically validate and serialize/deserialize.


# Define a Pydantic model for a single fruit
class Fruit(
    BaseModel
):  # We inherit from BaseModel so FastAPI can validate incoming data and generate OpenAPI docs automatically.
    name: str  # Each fruit must have a name, which is a string. This enforces data consistency for our API.


# Define a Pydantic model for a list of fruits
class Fruits(
    BaseModel
):  # This model wraps a list of Fruit objects, making it easier to return a consistent response structure.
    fruits: List[
        Fruit
    ]  # The 'fruits' field will hold a list of Fruit objects. This is useful for returning multiple fruits at once.


# Create a FastAPI app instance
app = FastAPI()  # This creates the main FastAPI application object, which handles all incoming HTTP requests.

# List of allowed origins for CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost:3000",  # We allow requests from our React frontend running on this origin. This is necessary for local development.
]

# Add CORS middleware to the app to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,  # This middleware enables CORS, which is required for browsers to allow frontend-backend communication across origins.
    allow_origins=origins,  # This should be 'origins' (not 'orgins'). It specifies which origins are allowed to access the API.
    allow_credentials=True,  # Allows cookies and authentication headers to be sent with requests. Useful for secure APIs.
    allow_methods=[
        "*"
    ],  # Allows all HTTP methods (GET, POST, etc.). This is flexible for development, but can be restricted for security.
    allow_headers=[
        "*"
    ],  # Allows all headers. This is also flexible for development and can be restricted as needed.
)

# Temporary in-memory database (dictionary) to store fruits
memory_db = {
    "fruits": []
}  # We use a simple dictionary to store fruits for demonstration. In production, this would be a real database.


# GET endpoint to retrieve all fruits
# FastAPI automatically converts the response to JSON
@app.get(
    "/fruits", response_model=Fruits
)  # This endpoint returns all fruits in the database, using the Fruits model for consistent output.
def get_fruits():  # Handles GET requests to /fruits. This is how clients fetch the list of fruits.
    return Fruits(
        fruits=memory_db["fruits"]
    )  # Returns the current list of fruits. FastAPI serializes this to JSON for the client.


# POST endpoint to add a new fruit
@app.post(
    "/fruits", response_model=Fruit
)  # This endpoint allows clients to add a new fruit. It returns the added fruit for confirmation.
def add_fruit(
    fruit: Fruit,
):  # Handles POST requests to /fruits. The request body must match the Fruit model.
    memory_db["fruits"].append(
        fruit
    )  # Adds the new fruit to our in-memory database. This simulates saving to a real database.
    return fruit  # Returns the added fruit so the client can see what was saved.


# Run the app with Uvicorn if this file is executed directly
if (
    __name__ == "__main__"
):  # This check ensures the app only runs if the script is executed directly (not imported as a module).
    uvicorn.run(
        app, host="0.0.0.0", port=8000
    )  # Starts the FastAPI app using Uvicorn on all network interfaces at port 8000. This makes the API accessible for development.
