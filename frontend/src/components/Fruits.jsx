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
//     This code uses the React useEffect hook to run a function when the component first mounts:

// useEffect(() => {    fetchFruits(); // Fetch fruits on initial render}, []); // Empty dependency array ensures this runs only once
// useEffect(() => { ... }, []) means the code inside will run only once, right after the component is rendered for the first time.
// Inside, it calls fetchFruits(), which fetches the list of fruits from the backend and updates the state.
// The empty array [] tells React not to re-run this effect unless the component is re-mounted.
// Summary:
// This code automatically loads the fruit list from the backend when the FruitList component appears on the page.
    useEffect(() => {
        fetchFruits(); // Fetch fruits on initial render
    }, []); // Empty dependency array ensures this runs only once

    // Render the UI
    //  fruits.map(...) loops through the fruits array (from state).
    // For each fruit, it creates a <li> element showing the fruit's name.
    // key={index} gives each list item a unique key (required by React for efficient rendering).
    // The result is a list of <li> elements, one for each fruit, displayed inside the <ul>.
    // Summary:
    // This code dynamically displays all fruits fetched from the backend as a list on the page.
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
            <AddFruitForm addFruit={addFruit} />
        </div>
    );
}

export default FruitList; // Export the FruitList component for use in other parts of the application