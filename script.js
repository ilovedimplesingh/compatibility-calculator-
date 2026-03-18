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

  function daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.abs((d1 - d2) / (1000 * 60 * 60 * 24));
  }

  function isClose(date1, date2) {
    return daysBetween(date1, date2) <= 3;
  }

  // EXACT MATCH (any order)
  const exactMatch =
    (data.dob1 === YOUR_DOB && data.dob2 === HER_DOB) ||
    (data.dob1 === HER_DOB && data.dob2 === YOUR_DOB);

  // CLOSE MATCH (if ANY one is close)
  const oneCloseToYou =
    isClose(data.dob1, YOUR_DOB) || isClose(data.dob2, YOUR_DOB);

  const oneCloseToHer =
    isClose(data.dob1, HER_DOB) || isClose(data.dob2, HER_DOB);

  const closeMatch = oneCloseToYou || oneCloseToHer;

  let targetScore, message, title;

  if (exactMatch) {
    targetScore = 100;
    title = "Perfect Alignment";
   message = `${data.name1} & ${data.name2}…

This connection feels rare… almost like it was meant to happen.

Not because everything is perfect,  
but because something about it just makes sense.

There’s a kind of pull here — quiet, natural, undeniable.  
Like no matter where things start, they somehow lead back to each other.

Out of all the possibilities, all the different paths…  
this is the one that feels right.

And out of everything that could’ve been….  
this is the one that feels right to hold onto.

Not just by chance… but by choice. ❤️
Not just fate… something worth choosing, again and again. ❤️`;
  } 
  else if (closeMatch) {
    targetScore = 75;
    title = "Data Mismatch ⚠️";
    message = "Something feels slightly off… please recheck the birth details carefully.";
  } 
  else {
    targetScore = 45;
    title = "Not Compatible ❌";
    message = "This person may not be the right match for you.";
  }

  document.getElementById("title").innerText = title;
  document.getElementById("message").innerText = message;

  animateScore(targetScore);
}


// ================== ANIMATION ==================
function animateScore(target) {
  let current = 0;
  const scoreEl = document.getElementById("score");

  let interval = setInterval(() => {
    current += 1;
    scoreEl.innerText = current + "%";

    if (current >= target) {
      clearInterval(interval);

      if (target === 100) {
        scoreEl.innerText = "100% ❤️";
      }
    }
  }, 20);
}


// ================== SECRET ==================
function showSecret() {
  document.getElementById("secret").classList.remove("hidden");
}
