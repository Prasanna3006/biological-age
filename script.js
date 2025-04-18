document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const quote = document.querySelector(".quote");
    const text = quote.textContent;
    quote.innerHTML = ""; // Clear text

    // Wrap each letter in a span
    text.split("").forEach((char) => {
        let span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char");
        quote.appendChild(span);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const chars = document.querySelectorAll(".char");
                    chars.forEach((char, i) => {
                        setTimeout(() => {
                            char.classList.add("visible");
                        }, i * 50);
                    });
                    observer.disconnect(); // Stop observing after animation
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% visible
    );

    observer.observe(quote);
});
document.addEventListener('DOMContentLoaded', function() {
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start animation when the timeline is in view
        startAnimation();
        // Once the animation starts, we don't need to observe anymore
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // Trigger when at least 20% of the element is visible
  
  // Start observing the timeline element
  const timeline = document.getElementById('timeline');
  observer.observe(timeline);
  
  function startAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineJoints = document.querySelectorAll('.timeline-joint');
    const timelineLine = document.querySelector('.timeline-line');
    
    // Calculate the total height of the timeline
    let totalHeight = 0;
    timelineItems.forEach((item, index) => {
      if (index < timelineItems.length - 1) {
        totalHeight += item.offsetHeight + 60; // height + margin-bottom
      } else {
        totalHeight += item.offsetHeight;
      }
    });
    
    // Animate the line to grow
    timelineLine.style.height = `${totalHeight}px`;
    
    // Animate items one by one
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        // First show the item content
        item.classList.add('visible');
        
        // Then drop in the joint with a slight delay
        setTimeout(() => {
          timelineJoints[index].classList.add('visible');
        }, 200);
      }, 400 * index);
    });
  }
});

$(document).ready(function() {
  // Animate timeline progress
  setTimeout(function() {
      $("#timelineProgress").css("width", "100%");
  }, 500);
  
  // Day marker animation
  let currentDay = 1;
  const interval = setInterval(function() {
      currentDay++;
      if (currentDay <= 7) {
          $(".timeline-day").eq(currentDay-1).addClass("active");
      } else {
          clearInterval(interval);
          setTimeout(function() {
              $(".timeline-day").removeClass("active");
              $(".timeline-day").eq(0).addClass("active");
              currentDay = 1;
              $("#timelineProgress").css("width", "0");
              setTimeout(function() {
                  $("#timelineProgress").css("width", "100%");
                  animateDays();
              }, 500);
          }, 1000);
      }
  }, 800);
  
  function animateDays() {
      currentDay = 1;
      const interval = setInterval(function() {
          currentDay++;
          if (currentDay <= 7) {
              $(".timeline-day").eq(currentDay-1).addClass("active");
          } else {
              clearInterval(interval);
          }
      }, 800);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start animation when the section is in view
        startAnimation();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // Trigger when 20% is visible
  
  const timelineContainer = document.querySelector('.container');
  observer.observe(timelineContainer);

  function startAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineJoints = document.querySelectorAll('.timeline-joint');
    const timelineLine = document.querySelector('.timeline-line');

    let totalHeight = 0;
    timelineItems.forEach((item, index) => {
      if (index < timelineItems.length - 1) {
        totalHeight += item.offsetHeight + 60;
      } else {
        totalHeight += item.offsetHeight;
      }
    });

    timelineLine.style.height = `${totalHeight}px`;

    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
        setTimeout(() => {
          timelineJoints[index].classList.add('visible');
        }, 200);
      }, 400 * index);
    });
  }
});

//Quiz Start

document.addEventListener('DOMContentLoaded', function() {
  const mythCards = document.querySelectorAll('.myth-card');
  const questionContainer = document.getElementById('question-container');
  const resultContainer = document.getElementById('result-container');
  const currentQuestion = document.getElementById('current-question');
  const currentImage = document.getElementById('current-image');
  const radioOptions = document.querySelectorAll('input[name="answer"]');
  
  // Color configuration
  const correctColor = '#4caf50';  // Green for correct answers
  const incorrectColor = '#f44336'; // Red for incorrect answers
  
  // Initialize with first card data
  if (mythCards.length > 0) {
      const firstCard = mythCards[0];
      currentQuestion.textContent = firstCard.dataset.title;
      currentImage.src = firstCard.dataset.image;
      currentImage.alt = firstCard.querySelector('.card-image').alt;
  }
  
  // Add click event to all myth cards
  mythCards.forEach(card => {
      card.addEventListener('click', function() {
          // Reset radio buttons
          radioOptions.forEach(radio => radio.checked = false);
          
          // Reset result container
          resultContainer.classList.remove('show');
          resultContainer.innerHTML = '';
          
          // Update question and image
          currentQuestion.textContent = this.dataset.title;
          currentImage.src = this.dataset.image;
          currentImage.alt = this.querySelector('.card-image').alt;
          
          // Scroll to top of active card on mobile
          if (window.innerWidth < 992) {
              document.querySelector('.active-card').scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Add event listener for radio buttons
  radioOptions.forEach(radio => {
      radio.addEventListener('change', function() {
          const selectedCard = Array.from(mythCards).find(
              card => card.dataset.title === currentQuestion.textContent
          );
          
          if (selectedCard) {
              const isMyth = this.value === 'myth';
              const isCorrect = isMyth ? 
                  selectedCard.dataset.mythCorrect === 'true' : 
                  selectedCard.dataset.factCorrect === 'true';
              
              const explanation = isMyth ? 
                  selectedCard.dataset.mythExplanation : 
                  selectedCard.dataset.factExplanation;
              
              // Show result with colored text
              resultContainer.innerHTML = `
                  <div class="congrats" style="color: ${isCorrect ? correctColor : incorrectColor}; font-weight: bold;">
                      ${isCorrect ? 'Congratulation, Right Answer!' : 'Sorry, that\'s not correct.'}
                  </div>
                  <p>${explanation}</p>
              `;
              resultContainer.classList.add('show');
          }
      });
  });
  
  // Prevent default for read more links
  document.addEventListener('click', function(e) {
      if (e.target.classList.contains('read-more')) {
          e.preventDefault();
      }
  });
});

//Quiz End

//Start pincode Available

let availablePincodes = [];
  
    // Load and transform pincodes from JSON
    fetch('pincodes.json')
      .then(response => response.json())
      .then(data => {
        // Extract the pincode numbers and convert to strings for comparison
        availablePincodes = data.map(entry => String(entry.Pincode));
      })
      .catch(error => {
        console.error("Error loading pincodes:", error);
      });
  
    function checkPincode() {
      const input = document.getElementById("pincodeInput").value.trim();
      const resultDiv = document.getElementById("result");
  
      if (availablePincodes.includes(input)) {
        resultDiv.innerHTML = `<span class="tick">✔</span><span class="available">Available</span>`;
      } else {
        resultDiv.innerHTML = `<span class="unavailable">Sorry, our services are currently unavailable at your pincode.</span>`;
      }
    }

//End Pincode Available