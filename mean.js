// Importing the Express library to create and manage the server
const express = require('express');

// Creating an instance of an Express application
const app = express();

// Defining the port number where the server will listen for requests
const PORT = 3000;

// Starting the server on the specified port and logging a message to the console
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Helper function to calculate the mean of an array of numbers
function calculateMean(nums) {
    // Reducing the array to a sum of all elements
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    // Returning the average by dividing the sum by the length of the array
    return sum / nums.length;
}

// Route handler for calculating the mean of numbers provided via query parameters
app.get('/mean', (req, res) => {
    // Check if nums query parameter exists, return error if not
    if (!req.query.nums) {
        return res.status(400).json({ error: 'nums are required' });
    }

    // Splitting the nums query string into an array of strings and converting to numbers
    const inputs = req.query.nums.split(',');
    const nums = [];
    for (let n of inputs) {
        const parsed = parseFloat(n);
        // Check if conversion resulted in a valid number, return error if not
        if (isNaN(parsed)) {
            return res.status(400).json({ error: `${n} is not a number` });
        }
        nums.push(parsed);
    }
    
    // Calculate the mean using the helper function
    const mean = calculateMean(nums);
    // Respond with JSON containing the operation type and calculated value
    res.json({ operation: 'mean', value: mean });
});

// Helper function to calculate the median of an array of numbers
function calculateMedian(nums) {
    // Sorting the array of numbers
    const sorted = nums.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    // Checking if the array length is even
    if (sorted.length % 2 === 0) {
        // Return the average of the two middle elements
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }

    // Return the middle element if the array length is odd
    return sorted[mid];
}

// Route handler for calculating the median of numbers provided via query parameters
app.get('/median', (req, res) => {
    // Check if nums query parameter exists, return error if not
    if (!req.query.nums) {
        return res.status(400).json({ error: 'nums are required' });
    }

    // Splitting the nums query string into an array of numbers
    const nums = req.query.nums.split(',').map(n => {
        const parsed = parseFloat(n);
        // Check if conversion resulted in a valid number, return error if not
        if (isNaN(parsed)) {
            return res.status(400).json({ error: `${n} is not a number` });
        }
        return parsed;
    });

    // Calculate the median using the helper function
    const median = calculateMedian(nums);
    // Respond with JSON containing the operation type and calculated value
    res.json({ operation: 'median', value: median });
});

// Helper function to calculate the mode of an array of numbers
function calculateMode(nums) {
    const freq = {}; // Object to keep track of frequency of each number
    let maxFreq = 0; // Variable to store the maximum frequency found
    let modes = []; // Array to store the numbers with the highest frequency

    // Populate the frequency object
    nums.forEach(num => {
        if (freq[num]) {
            freq[num]++;
        } else {
            freq[num] = 1;
        }

        // Update the modes array whenever a new max frequency is found
        if (freq[num] > maxFreq) {
            maxFreq = freq[num];
            modes = [num];
        } else if (freq[num] === maxFreq) {
            modes.push(num);
        }
    });

    // Return the mode(s) - if multiple numbers share the highest frequency
    return modes.length === 1 ? modes[0] : modes;
}

// Route handler for calculating the mode of numbers provided via query parameters
app.get('/mode', (req, res) => {
    // Check if nums query parameter exists, return error if not
    if (!req.query.nums) {
        return res.status(400).json({ error: 'nums are required' });
    }

    // Splitting the nums query string into an array of numbers
    const nums = req.query.nums.split(',').map(n => {
        const parsed = parseFloat(n);
        // Check if conversion resulted in a valid number, return error if not
        if (isNaN(parsed)) {
            return res.status(400).json({ error: `${n} is not a number` });
        }
        return parsed;
    });

    // Calculate the mode using the helper function
    const mode = calculateMode(nums);
    // Respond with JSON containing the operation type and calculated value
    res.json({ operation: 'mode', value: mode });
});