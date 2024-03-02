(async () => {
    try {
        // Fetch JSON data
        const response = await fetch('images.json');
        const data = await response.json();
        
        const imageContainer = document.getElementById('imageContainer');

        // Loop through each image object in the JSON array
        data.forEach(imageObj => {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const imgElement = document.createElement('img');
            imgElement.src = imageObj.image;
            imgElement.alt = 'Image';
            imgElement.loading = 'lazy'; // Lazy load images

            const caption = document.createElement('div');
            caption.classList.add('caption');
            caption.textContent = imageObj.caption; // Add caption text

            // Append the image and caption to the container
            imageItem.appendChild(imgElement);
            imageItem.appendChild(caption);
            imageContainer.appendChild(imageItem);
        });
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
})();
