// SAVE DATA
const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
      name1: document.getElementById("name1").value,
      dob1: document.getElementById("dob1").value,
      name2: document.getElementById("name2").value,
      dob2: document.getElementById("dob2").value
    };

    localStorage.setItem("loveData", JSON.stringify(data));
    window.location.href = "result.html";
  });
}


// RESULT PAGE LOGIC
const resultBox = document.getElementById("resultBox");

if (resultBox) {
  const data = JSON.parse(localStorage.getItem("loveData"));

  let progressText = document.getElementById("loading");
  let title = document.getElementById("title");

  let steps = [
    "Aligning planets...",
    "Reading emotional patterns...",
    "Detecting rare connection...",
    "Finalizing result..."
  ];

  let i = 0;

  let interval = setInterval(() => {
    progressText.innerText = steps[i];
    i++;

    if (i === steps.length) {
      clearInterval(interval);
      showResult(data);
    }
  }, 1200);
}


function showResult(data) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("resultBox").classList.remove("hidden");

  const isYouTwo =
    data.dob1 === "2003-10-21" &&
    data.dob2 === "2007-09-08";

  let score, message, title;

  if (isYouTwo) {
    score = "100% Compatibility ❤️";
    title = "Perfect Alignment";
    message = `${data.name1} & ${data.name2}, this connection feels rare... almost like it was meant to happen.`;
  } else {
    score = Math.floor(Math.random() * 40) + 50 + "% Compatibility";
    title = "Partial Match";
    message = "There is some connection, but something feels incomplete.";
  }

  document.getElementById("score").innerText = score;
  document.getElementById("title").innerText = title;
  document.getElementById("message").innerText = message;
}


function showSecret() {
  document.getElementById("secret").classList.remove("hidden");
}
