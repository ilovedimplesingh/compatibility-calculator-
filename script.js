// ================== FORM SUBMIT ==================
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


// ================== RESULT PAGE ==================
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


// ================== RESULT LOGIC ==================
function showResult(data) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("resultBox").classList.remove("hidden");

  const YOUR_DOB = "2003-10-21";
  const HER_DOB = "2007-09-08";

  // check closeness (±3 days)
  function isClose(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const diff = Math.abs(d1 - d2);
    const days = diff / (1000 * 60 * 60 * 24);

    return days <= 3;
  }

  // exact match (any order)
  const exactMatch =
    (data.dob1 === YOUR_DOB && data.dob2 === HER_DOB) ||
    (data.dob1 === HER_DOB && data.dob2 === YOUR_DOB);

  // close match (small mistake)
  const closeMatch =
    (isClose(data.dob1, YOUR_DOB) && isClose(data.dob2, HER_DOB)) ||
    (isClose(data.dob1, HER_DOB) && isClose(data.dob2, YOUR_DOB));

  let score, message, title;

  if (exactMatch) {
    score = "100% Compatibility ❤️";
    title = "Perfect Alignment";
    message = `${data.name1} & ${data.name2}, this connection feels rare... almost like it was meant to happen.`;
  } 
  else if (closeMatch) {
    score = "Calculation Error ⚠️";
    title = "Data Mismatch";
    message = "Something feels slightly off... please recheck the birth details carefully.";
  } 
  else {
    score = "Not Compatible ❌";
    title = "Mismatch Detected";
    message = "This connection may not be as strong as it seems. Something feels missing.";
  }

  document.getElementById("score").innerText = score;
  document.getElementById("title").innerText = title;
  document.getElementById("message").innerText = message;
}


// ================== SECRET BUTTON ==================
function showSecret() {
  document.getElementById("secret").classList.remove("hidden");
}
