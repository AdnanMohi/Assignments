document.addEventListener('DOMContentLoaded', function() {
    const folderContainer = document.getElementById('folder-container');
    const teamMembersButton = document.getElementById('add-team-btn');
    const mainContainer = document.querySelector('.main-container');

    // Add click event listener to folder elements
    folderContainer.addEventListener('click', function(event) {
        // Check if the clicked element is a folder or its child elements
        if (event.target.classList.contains('folder') || event.target.parentElement.classList.contains('folder')) {
            // Create a new div for folder content
            const newDiv = document.createElement('div');
            newDiv.classList.add('folder-content');

            // Add buttons for adding columns and rows, and for editing
            newDiv.innerHTML = `
                <button class="add-column">Add Column</button>
                <button class="add-row">Add Row</button>
                <button class="edit">Edit</button>
            `;

            // Append the new div to the main container
            mainContainer.appendChild(newDiv);
        }
    });

    // Add click event listener to team members button
    teamMembersButton.addEventListener('click', function() {
        // Create a new div for team member content
        const newDiv = document.createElement('div');
        newDiv.classList.add('team-member-content');

        // Add buttons for adding columns and rows, and for editing
        newDiv.innerHTML = `
            <button class="add-column">Add Column</button>
            <button class="add-row">Add Row</button>
            <button class="edit">Edit</button>
        `;

        // Append the new div to the main container
        mainContainer.appendChild(newDiv);
    });
});
