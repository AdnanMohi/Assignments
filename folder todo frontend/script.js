document.addEventListener('DOMContentLoaded', function() {
    const addFolderButton = document.getElementById('addFolderButton');
    const finalizeFolderButton = document.getElementById('finalizeFolderButton');
    const folderNameInput = document.getElementById('folderNameInput');
    const folderContainer = document.getElementById('folder-container');
    const addTeamButton = document.getElementById('add-team-btn');



    addTeamButton.addEventListener('click', function() {
        // Prompt the user to enter the team member's name
        const teamMemberName = prompt('Enter the name of the team member:');

        // Check if the user entered a name
        if (teamMemberName !== null && teamMemberName.trim() !== '') {
            // Create a new element to display the team member's name
            const teamMemberElement = document.createElement('div');
            teamMemberElement.textContent = teamMemberName;
            teamMemberElement.classList.add('team-member');

            // Append the team member's name to the container
            const teamMembersContainer = document.querySelector('.team-members');
            teamMembersContainer.appendChild(teamMemberElement);
        } else {
            // Inform the user if they didn't enter a name
            alert('Please enter a valid name for the team member.');
        }
    });
    addFolderButton.addEventListener('click', function() {
        // Display the input field for entering folder name
        folderNameInput.style.display = 'inline-block';
        folderNameInput.focus();

        // Hide the "+" button
        addFolderButton.style.display = 'none';

        // Display the tick sign button
        finalizeFolderButton.style.display = 'inline-block';
    });

    finalizeFolderButton.addEventListener('click', function() {
        const folderName = folderNameInput.value.trim();

        if (folderName !== '') {
            // Create a new folder element
            const newFolder = document.createElement('div');
            newFolder.classList.add('folder');

            // Create a container for folder name and subfolders
            const folderContent = document.createElement('div');
            folderContent.classList.add('folder-content');

            // Create a div to hold folder name
            const folderNameContainer = document.createElement('div');
            folderNameContainer.classList.add('folder-name-container');

            // Display the folder name
            const folderNameDisplay = document.createElement('div');
            folderNameDisplay.textContent = folderName;
            folderNameDisplay.classList.add('folder-name');

            // Append the folder name to its container
            folderNameContainer.appendChild(folderNameDisplay);

            // Create a button to toggle the dropdown visibility
            const toggleDropdownButton = document.createElement('button');
            toggleDropdownButton.textContent = '▼ ';
            toggleDropdownButton.classList.add('toggle-dropdown-button');

            // Create a dropdown container for subfolders
            const dropdownContainer = document.createElement('div');
            dropdownContainer.classList.add('dropdown-container');
            dropdownContainer.style.display = 'none'; // Hide dropdown initially

            // Create an initial "Add Subfolder" button within the dropdown
            const initialAddSubfolderButton = document.createElement('button');
            initialAddSubfolderButton.textContent = '+ Add Subfolder';
            initialAddSubfolderButton.classList.add('add-subfolder-button');

            // Add event listener to add a new subfolder
            initialAddSubfolderButton.addEventListener('click', function() {
                const subfolderName = prompt('Enter the subfolder name:');
                if (subfolderName !== null && subfolderName.trim() !== '') {
                    // Create a new subfolder element
                    const subfolderElement = document.createElement('div');
                    subfolderElement.textContent = subfolderName;
                    subfolderElement.classList.add('subfolder');

                    // Append the new subfolder to the dropdown container
                    dropdownContainer.appendChild(subfolderElement);
                } else {
                    alert('Subfolder name cannot be empty!');
                }
            });

            // Add the initial "Add Subfolder" button to the dropdown container
            dropdownContainer.appendChild(initialAddSubfolderButton);

            // Add event listener to toggle dropdown visibility
            toggleDropdownButton.addEventListener('click', function() {
                if (dropdownContainer.style.display === 'none') {
                    dropdownContainer.style.display = 'block';
                    toggleDropdownButton.textContent = '▲ ';
                } else {
                    dropdownContainer.style.display = 'none';
                    toggleDropdownButton.textContent = '▼';
                }
            });

            // Append elements to folder content
            folderContent.appendChild(folderNameContainer);
            folderContent.appendChild(toggleDropdownButton);
            folderContent.appendChild(dropdownContainer);

            // Append folder content to the new folder
            newFolder.appendChild(folderContent);

            // Append the new folder to the container
            folderContainer.appendChild(newFolder);

            // Reset the input field and buttons
            folderNameInput.value = '';
            folderNameInput.style.display = 'none';
            addFolderButton.style.display = 'inline-block';
            finalizeFolderButton.style.display = 'none';
        } else {
            alert('Please enter a folder name');
        }
    });
});
