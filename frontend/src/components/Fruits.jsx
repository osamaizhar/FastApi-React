// Import React and necessary hooks from the React library
import React, { use, useEffect, useState } from "react";
// Import the API instance for making HTTP requests
import api from "../api.js";
// Import the AddFruitForm component for adding new fruits
import AddFruitForm from "./AddFruitForm";

// Define the FruitList component
const FruitList = () => {
    // Declare a state variable 'fruits' to store the list of fruits, initialized as an empty array
    const [fruits, setFruits] = useState([]);
    // Function to fetch the list of fruits from the backend API
    // The endpoint URL is defined here, and the base URL is set in api.js
    // CORS is allowed in the FastAPI backend to enable frontend-backend communication
    const fetchFruits = async () => {
        try {
            // Make a GET request to the /fruits endpoint
            const response = await api.get("/fruits");
            // Update the fruits state with the data received from the backend
            setFruits(response.data.fruits);
        } catch (error) {
            // Log any errors that occur during the fetch
            console.error("Error fetching fruits", error);
        }
    };

    // Function to add a new fruit by sending a POST request to the backend
    const addFruit = async (fruitName) => {
        try {
            // Send a POST request to /fruits with the new fruit's name
            await api.post("/fruits", { name: fruitName });
            // Refresh the fruit list after adding a new fruit
            fetchFruits();
        } catch (error) {
            // Log any errors that occur during the add operation
            console.error("Error adding fruit", error);
        }
    };

    // useEffect hook to fetch the fruit list when the component mounts
    useEffect(() => {
        fetchFruits(); // Fetch fruits on initial render
    }, []); // Empty dependency array ensures this runs only once

    // Render the UI
    return (
        <div>
            {/* Heading for the fruit list */}
            <h2>Fruit List</h2>
            {/* Render the list of fruits */}
            <ul>
                {fruits.map((fruit, index) => (
                    // Each fruit is displayed as a list item
                    <li key={index}>{fruit.name}</li>
                ))}
            </ul>
            {/* You can add the AddFruitForm component here to allow adding new fruits */}
            {/* <AddFruitForm addFruit={addFruit} /> */}
        </div>
    );
}