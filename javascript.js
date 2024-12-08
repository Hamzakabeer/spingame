const spinner = document.getElementById("spinner");
const spinButton = document.getElementById("spinButton");
const message = document.getElementById("message");
const prizeImage = document.getElementById("prizeImage");

// Fixed names
const names = [
  "Muhammad Hamza Kabeer",
  "Ali",
  "Ghous Ahmed",
  "Rayan",
  "Shayan",
  "Danish",
  "Sami",
  "Salman",
  "Smit-Students",
  "Yasir",
];

// Predefined prizes with images
const prizes = [
  { name: "Car", img: "https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { name: "Mobile", img: "https://cdn.shopify.com/s/files/1/0877/2327/8677/files/Falcon-Supernova-iPhone-6-Pink-Diamond-1024x576_480x480.webp?v=1731966485" },
  { name: "Cash Prize", img: "https://media.gettyimages.com/id/182772516/photo/hundred-bucks-waving.jpg?s=612x612&w=0&k=20&c=XBcmjbx1M_0ohMJ7BC1R5m8zuwCG8cIGIUFcuNvXXbs=" },
  { name: "Bike", img: "https://cdn.visordown.com/styles/img_1200_webp/s3/MY23_Ducati_Panigale_V4_R_101_UC440906_High.jpg.webp?itok=z3Xg8Gen" },
  { name: "Laptop", img: "https://static.wixstatic.com/media/bab4a8_fd45b8da609b494685210063268f341d~mv2.jpeg/v1/fill/w_525,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/bab4a8_fd45b8da609b494685210063268f341d~mv2.jpeg" },
  { name: "Tablet", img: "https://cdn.mos.cms.futurecdn.net/ApnjTn3odhvCf7dB3VMpeL-1200-80.jpg.webp" },
];

let spinsLeft = 10;

spinButton.addEventListener("click", () => {
  if (spinsLeft <= 0) {
    message.textContent = "Game Over! No spins left.";
    message.classList.remove("hidden");
    prizeImage.classList.add("hidden");
    return;
  }

  // Fast spin with smooth stop
  const randomDegree = Math.floor(Math.random() * 360); // Random angle
  const spinDuration = 2; // Spin duration in seconds

  // Hide the previous message and image
  message.classList.add("hidden");
  prizeImage.classList.add("hidden");

  // Start spinning
  spinner.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 1, 0.5, 1)`;
  spinner.style.transform = `rotate(${randomDegree + 3600}deg)`; // Add extra rotations for speed

  spinButton.disabled = true;

  setTimeout(() => {
    spinButton.disabled = false;

    // Determine winner
    const winnerIndex = Math.floor((randomDegree % 360) / (360 / names.length));
    const winnerName = names[winnerIndex];

    const wonPrize = Math.random() > 0.3; // 70% chance to win
    if (wonPrize) {
      // Select a random prize
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      message.textContent = `🎉 Congratulations ${winnerName}! You won a ${randomPrize.name}!`;
      prizeImage.src = randomPrize.img;
      prizeImage.alt = randomPrize.name;
      prizeImage.classList.remove("hidden");
    } else {
      message.textContent = `😢 Oops, Sorry ${winnerName}! Better luck next time!`;
    }

    message.classList.remove("hidden");
    spinsLeft--;

    if (spinsLeft === 0) {
      message.textContent = "🎊 All spins used! Thank you for playing.";
    }
  }, spinDuration * 1000);
});
