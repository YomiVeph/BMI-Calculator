"use strict";

const maleBtn = document.querySelector(".btn-male");
const femaleBtn = document.querySelector(".btn-female");

const bmiBtn = document.querySelector(".bmi-btn");

const cmInput = document.querySelector(".cmInput");
const ftInput = document.querySelector(".ftInput");
const kgInput = document.querySelector(".kgInput");
const lbInput = document.querySelector(".lbInput");

const cm = document.getElementById("cm");
const ft = document.getElementById("ft");
const inches = document.getElementById("inches");
const kg = document.getElementById("kg");
const lb = document.getElementById("lb");

const cmBtn = document.getElementById("cmBtn");
const ftBtn = document.getElementById("ftBtn");
const kgBtn = document.getElementById("kgBtn");
const lbBtn = document.getElementById("lbBtn");

//Setting default state

ftInput.style.display = "none";
lbInput.style.display = "none";

//       Toggle
//Gender Toggle

maleBtn.addEventListener("click", () => {
  maleBtn.classList.add("active");
  femaleBtn.classList.remove("active");
});

femaleBtn.addEventListener("click", () => {
  femaleBtn.classList.add("active");
  maleBtn.classList.remove("active");
});

//Height Toggle
cmBtn.addEventListener("click", () => {
  cmBtn.classList.add("active");
  ftBtn.classList.remove("active");
  cmInput.style.display = "block";
  ftInput.style.display = "none";

  //converting ft/in to cm
  if (ft.value || inches.value) {
    const totalInches = ft.value * 12 + Number(inches.value);
    cm.value = (totalInches * 2.54).toFixed(1);
  }
});

ftBtn.addEventListener("click", () => {
  ftBtn.classList.add("active");
  cmBtn.classList.remove("active");

  ftInput.style.display = "block";
  cmInput.style.display = "none";

  //converting cm to ft/in
  if (cm.value) {
    const totalInches = cm.value / 2.54;
    ft.value = Math.floor(totalInches / 12);
    inches.value = Math.round(totalInches % 12);
  }
});

//Weight Toggle
kgBtn.addEventListener("click", () => {
  kgBtn.classList.add("active");
  lbBtn.classList.remove("active");

  kgInput.style.display = "block";
  lbInput.style.display = "none";

  //Covert lb to kg
  if (lb.value) {
    kg.value = (lb.value / 2.205).toFixed(1);
  }
});

lbBtn.addEventListener("click", () => {
  lbBtn.classList.add("active");
  kgBtn.classList.remove("active");

  lbInput.style.display = "block";
  kgInput.style.display = "none";

  //Converting kg to lb
  if (kg.value) {
    lb.value = (kg.value * 2.205).toFixed(1);
  }
});

//BMI Calculation
bmiBtn.addEventListener("click", () => {
  const result = document.getElementById("result");
  const bmiValue = document.getElementById("bmiValue");
  const bmiStatus = document.getElementById("bmiStatus");
  const bmiInfo = document.getElementById("bmiInfo");

  let heightInMeters;
  let weightInKg;

  if (cmBtn.classList.contains("active")) {
    heightInMeters = cm.value / 100;
  } else {
    const totalInches = ft.value * 12 + Number(inches.value);
    heightInMeters = (totalInches * 2.54) / 100;
  }

  if (kgBtn.classList.contains("active")) {
    weightInKg = kg.value;
  } else {
    weightInKg = lb.value / 2.205;
  }

  if (!heightInMeters || !weightInKg) {
    alert("Kindly enter your height and weight");
    return;
  }

  const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);

  let status = "";
  let color = "";

  if (bmi < 18.5) {
    status = "Underweight";
    color = "#00bcd4";
    bmiInfo.textContent =
      "You are below the healthy weight range. Eating more nutritious food may help improve your weight and health.";
  } else if (bmi < 25) {
    status = "Normal";
    color = "#4caf50";
    bmiInfo.textContent =
      "You have a healthy body weight. Keep maintaining a balanced diet and regular exercise to stay Healthy.";
  } else if (bmi < 30) {
    status = "Overweight";
    color = "#ff9800";
    bmiInfo.textContent =
      "You are slightly about the healthy range. Regular exercise and better diet can help you get better.";
  } else {
    status = "Obese";
    color = "#f44336";
    bmiInfo.textContent =
      "Your BMI is very high. Consider lifestyle changes and professional medical advice";
  }
  bmiValue.textContent = bmi;
  bmiStatus.textContent = status;
  bmiStatus.style.color = color;
  bmiValue.style.color = color;
  result.style.display = "block";
});
