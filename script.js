document.getElementById('seatFinderForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const resultDiv = document.getElementById('result');
    const nameDisplay = document.getElementById('name');
    const categoryDisplay = document.getElementById('category');
    const seatNumbersDisplay = document.getElementById('seatNumbers');

    resultDiv.textContent = ''; // Clear previous results
    nameDisplay.textContent = '';
    categoryDisplay.textContent = '';
    seatNumbersDisplay.textContent = '';

    const bookingCode = document.getElementById('bookingCode').value.trim().toLowerCase();
    const dataUrl = 'seat_finder.csv'; // Replace with your actual CSV file name

    try {
        const response = await fetch(dataUrl, { mode: 'cors' });
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header row
        const dataFound = findSeatDetails(bookingCode, rows);

        if (dataFound) {
            nameDisplay.textContent = `Name: ${dataFound.name}`;
            categoryDisplay.textContent = `Category: ${dataFound.category}`;
            seatNumbersDisplay.textContent = `Your Seat(s): ${dataFound.seatNumbers.join(', ')}`;
        } else {
            resultDiv.textContent = 'Booking code not found. Please check your code and try again.';
        }
    } catch (error) {
        resultDiv.textContent = 'Error retrieving seat information.';
        console.error(error);
    }
});

function findSeatDetails(bookingCode, rows) {
    for (const row of rows) {
        const columns = row.split(',');
        if (columns[0].replace(/['"]+/g, '').trim().toLowerCase() === bookingCode) {
            return {
                name: columns[2].replace(/['"]+/g, '').trim(),
                category: columns[3].replace(/['"]+/g, '').trim(),
                seatNumbers: columns[1].replace(/['"]+/g, '').split(' ').map(seat => seat.trim())
            };
        }
    }
    return null; 
}
