document.addEventListener("DOMContentLoaded", () => {
  const background = document.querySelector(".background");
  const cards = Array.from(document.querySelectorAll(".card"));

  // Clone cards for infinite scroll effect
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    background.appendChild(clone);
  });

  const allCards = document.querySelectorAll(".card");
  let scrollPosition = 0;

  const updateActiveCard = () => {
    const centerY = background.clientHeight / 2;
    allCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenterY = rect.top + rect.height / 2;

      if (Math.abs(centerY - cardCenterY) < card.offsetHeight / 2) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  };

  background.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY;

    scrollPosition += delta;
    const maxScroll = allCards[0].offsetHeight * (allCards.length - 1);

    if (scrollPosition >= maxScroll) {
      scrollPosition = 0; // Reset to the top
    } else if (scrollPosition <= 0) {
      scrollPosition = maxScroll; // Reset to the bottom
    }

    background.scrollTo({
      top: scrollPosition,
      behavior: "auto",
    });

    updateActiveCard();
  });

  updateActiveCard(); // Initialize
});




