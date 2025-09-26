document.addEventListener('DOMContentLoaded', () => {
    const jokeText = document.getElementById('joke-text');
    const jokeDelivery = document.getElementById('joke-delivery');
    const getJokeBtn = document.getElementById('get-joke');
    const categoryBtns = document.querySelectorAll('.category-btn');
    let selectedCategory = 'Programming'; // Default category

    // Function to fetch jokes from the API
    async function fetchJoke(category) {
        try {
            const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?safe-mode`);
            const data = await response.json();
            
            if (data.error) {
                throw new Error('Failed to fetch joke');
            }

            displayJoke(data);
        } catch (error) {
            jokeText.textContent = 'Oops! Failed to fetch joke. Please try again.';
            jokeDelivery.classList.add('hidden');
        }
    }

    // Function to display the joke
    function displayJoke(jokeData) {
        if (jokeData.type === 'single') {
            jokeText.textContent = jokeData.joke;
            jokeDelivery.classList.add('hidden');
        } else {
            jokeText.textContent = jokeData.setup;
            jokeDelivery.textContent = jokeData.delivery;
            jokeDelivery.classList.remove('hidden');
        }
    }

    // Event listener for the "Get New Joke" button
    getJokeBtn.addEventListener('click', () => {
        fetchJoke(selectedCategory);
    });

    // Event listeners for category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button styling
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update selected category and fetch new joke
            selectedCategory = btn.dataset.category;
            fetchJoke(selectedCategory);
        });
    });

    // Set initial active category and fetch first joke
    categoryBtns[0].classList.add('active');
    fetchJoke(selectedCategory);
});