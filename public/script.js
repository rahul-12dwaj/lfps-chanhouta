document.addEventListener('DOMContentLoaded', () =>{
    const menuBtn = document.querySelector(".menu-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const cancelsearch = document.querySelector(".cancel-search");
    const items = document.querySelector(".nav-items");
    const searchBox = document.querySelector('.search-box'); // Define searchBox
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const errorText = document.getElementById('errorText');
    
    menuBtn.onclick = () => {
        items.classList.add("active");
        menuBtn.classList.add("hide");
        cancelBtn.classList.add("show");
    }
    
    cancelBtn.onclick = () => {
        items.classList.remove("active");
        menuBtn.classList.remove("hide");
        cancelBtn.classList.remove("show");
    }
    
    /*search box*/
    function toggleCancelSearchVisibility() {
        if (searchBox.value.trim() !== " ") {
            cancelsearch.style.display = 'inline-block';
        } else {
            cancelsearch.style.display = 'none';
        }
    }
    cancelsearch.onclick = () =>{
        searchBox.value="";
        searchSuggestions.style.display = 'none';
        errorText.style.display = 'none';
        cancelsearch.style.display = 'none';
    }


    searchBox.addEventListener('input', toggleCancelSearchVisibility); 
    /*adds an event listener to the searchBox element, 
    listening for the 'input' event. When a user interacts 
    with the searchBox input field by typing, pasting, or deleting 
    characters, the 'input' event is triggered.*/

    searchInput.addEventListener('mouseout', function() {
        // Handle the mouseout event
        searchSuggestions.style.display = 'none';
        cancelsearch.style.display = 'none';
    });
    searchInput.addEventListener('mouseover', function(){
        if (searchInput.value.trim() !== ''){
            cancelsearch.style.display = 'inline-block';
        }
        else{
            cancelsearch.style.display = 'none';
        }
    });
    cancelsearch.addEventListener('mouseover', function(){
        if (searchInput.value.trim() !== ''){
            cancelsearch.style.display = 'inline-block';
        }
    });
    
    
        
    
    

    // Sample suggestion data (replace with your own data)
    const suggestions = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];

    // Function to display suggestions
    function showSuggestions() {
        const userInput = searchInput.value.toLowerCase();
        const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(userInput));
        renderSuggestions(filteredSuggestions);
        showError(!isInSuggestions(userInput));
    }

    // Function to render suggestions
    function renderSuggestions(suggestions) {
        searchSuggestions.innerHTML = '';
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            li.addEventListener('click', () => {
                searchInput.value = suggestion;
                searchSuggestions.innerHTML = '';
            });
            searchSuggestions.appendChild(li);
        });
        searchSuggestions.style.display = suggestions.length > 0 ? 'block' : 'none';
    }

    // Function to check if input is in suggestions
    function isInSuggestions(input) {
        const lowerCaseInput = input.toLowerCase();
        return suggestions.some(suggestion => {
            const lowerCaseSuggestion = suggestion.toLowerCase();
            return lowerCaseInput.split('').every((char, index) => lowerCaseSuggestion[index] === char);
        });
    }
    // Function to show or hide error message
    function showError(show) {
        errorText.style.display = show ? 'block' : 'none';
    }
    
    // Event listener for input
    searchInput.addEventListener('input', () => {
        showSuggestions();
        if (searchInput.value.trim() === '') {
            errorText.style.display = 'none';
            searchSuggestions.style.display = 'none';
            cancelsearch.style.display = 'none';
        } else {
            errorText.style.display = 'none'; // Hide error initially
            showError(!isInSuggestions(searchInput.value)); // Show error if input doesn't match suggestions
        }
    });



    /* Image Slider */
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    slides.forEach((slide, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    let slideIndex = 0;
    
    function goToSlide(index) {
        slideIndex = index;
        const offset = -100 * slideIndex;
        document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
        updateDots();
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }
    
    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        goToSlide(slideIndex);
    }
    
    setInterval(nextSlide, 3000); // Auto slide every 5 seconds


    // script.js

    // Define news items
    // Function to populate news section with dynamic content
    function populateNews() {
        const newsList = document.getElementById('newsList');
        // No need to clear existing content
        // Add news items dynamically
        const newsItems = newsList.querySelectorAll('li');
        scrollNews(newsItems);
    }

    // Call populateNews function to initialize news section
    populateNews();

    // Function to scroll news items from bottom to top
    function scrollNews(newsItems) {
        let translateY = 0;
        let index = 0;

        function resetTransform() {
            newsItems.forEach(item => {
                item.style.transition = 'none';
                item.style.transform = 'translateY(0)';
                setTimeout(() => {
                    item.style.transition = 'transform 0.2s ease-in-out';
                });
            });
        }

        setInterval(() => {
            translateY -= 3; // Adjust scrolling speed as needed
            index++;
            newsItems.forEach(item => {
                item.style.transform = `translateY(${translateY}px)`;
            });
            if (index >= newsItems.length) {
                translateY = 0;
                index = 0;
                setTimeout(resetTransform, 1); // Delay before resetting
            }
        }, 300); // Adjust scroll interval as needed
    }

    function showStudentForm() {
        document.getElementById("student-form").style.display = "block";
        document.getElementById("admin-form").style.display = "none";
        var studentButtons = document.getElementsByClassName("student-button");
        for (var i = 0; i < studentButtons.length; i++) {
            studentButtons[i].style.backgroundColor = "rgb(79, 165, 79)";
            studentButtons[i].style.color = "white";
        }
        var adminButtons = document.getElementsByClassName("admin-button");
        for (var i = 0; i < adminButtons.length; i++) {
            adminButtons[i].style.backgroundColor = "white";
            adminButtons[i].style.color = "black";
        
        }
    }

    function showAdminForm() {
        document.getElementById("admin-form").style.display = "block";
        document.getElementById("student-form").style.display = "none";
        var adminButtons = document.getElementsByClassName("admin-button");
        for (var i = 0; i < adminButtons.length; i++) {
            adminButtons[i].style.backgroundColor = "rgb(79, 165, 79)";
            adminButtons[i].style.color = "white";
        }
        var studentButtons = document.getElementsByClassName("student-button");
        for (var i = 0; i < studentButtons.length; i++) {
            studentButtons[i].style.backgroundColor = "white";
            studentButtons[i].style.color = "black";
        }
    }

});