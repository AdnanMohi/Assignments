const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const filename = 'company-job-openings.csv';

// Read CSV file and convert to JSON
function readCSVFile() {
    try {
        const csvData = fs.readFileSync(filename, 'utf8');
        const rows = csvData.split('\n');
        const headers = rows[0].split(',');
        const jsonData = rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((obj, header, index) => {
                const value = values[index];
                if (value !== undefined && value !== null) {
                    obj[header.trim()] = value.trim();
                } else {
                    obj[header.trim()] = ''; // or handle null/undefined value accordingly
                }
                return obj;
            }, {});
        });
        console.log('CSV Data:', jsonData); // Moved console log statement here
        return jsonData;
    } catch (error) {
        console.error('Error reading CSV file:', error);
        return [];
    }
}

// Write JSON data to CSV file (append mode)
function writeCSVFile(data) {
    try {
        if (Array.isArray(data)) {
            // Convert JSON data to CSV format
            const csvData = data.map(obj => Object.values(obj).join(',')).join('\n');
            fs.appendFileSync(filename, csvData + '\n', 'utf8');
        } else {
            console.error('Data is not an array.');
        }
    } catch (error) {
        console.error('Error appending to CSV file:', error);
    }
}



// GET route to fetch data from CSV file
app.get('/api/company-job-openings', (req, res) => {
    const jsonData = readCSVFile();
    res.json(jsonData);
});

// POST route to update CSV file with new data
app.post('/api/company-job-openings', (req, res) => {
    try {
        // Extract data from the request body
        const newData = req.body;
        
        // Update CSV file with new data
        writeCSVFile([newData]);
        
        res.send('CSV file updated successfully!');
    } catch (error) {
        console.error('Error updating CSV file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
