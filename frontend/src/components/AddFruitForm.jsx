// Import React and useState hook from the React library
import React, { useState } from 'react';

// Define the AddFruitForm component, which receives an addFruit function as a prop , addFruit is a placeholder for the function that shall be passed here 
const AddFruitForm = ({ addFruit }) => {
    // Declare a state variable 'fruitName' to store the input value, initialized as an empty string
    const [fruitName, setFruitName] = useState("")

    // Function to handle form submission
    const handleSubmit  = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior (page reload)
        if (fruitName) { // Only add the fruit if the input is not empty
            addFruit(fruitName); // Call the addFruit function passed as a prop with the current fruit name
            setFruitName(""); // Reset the input field to an empty string after submission
        }
    };

    // Render the form UI

    return (
        // Form element with onSubmit handler
        <form onSubmit={handleSubmit}>
            {/* Input field for entering the fruit name */}
            <input
                type="text" // Input type is text
                value={fruitName} // Controlled input value bound to fruitName state
                onChange={(e) => setFruitName(e.target.value)} // Update state on input change
                placeholder="Enter Fruit Name" // Placeholder text for the input
            />
            {/* Button to submit the form */}
            <button type="submit">Add Fruit</button>
        </form>
    );