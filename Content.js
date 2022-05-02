if (window.location.href.indexOf("mobile.de/") > -1) {
  const fuelScrp = document.getElementById("fuel-v");
  fuel = fuelScrp.textContent;

  const priceScrp = document.querySelectorAll(
    ".vip-price-rating__tech-details"
  );
  price = parseInt(priceScrp[0].textContent.match(/\d/g).join(""));

  const co2Scrp = document.getElementById("envkv.emission-v");
  co2 = parseInt(co2Scrp.textContent.match(/\d/g).join(""));

  const dateRegScrp = document.getElementById("firstRegistration-v");
  dateReg = new Date("01/" + dateRegScrp.textContent);

  const ccScrp = document.getElementById("cubicCapacity-v");
  cc = parseInt(ccScrp.textContent.match(/\d/g).join(""));

  // componente cilindrada
  var ccComp;
  var ccSub;
  if (cc > 1251) {
    ccComp = 5.08;
    ccSub = 5616.9;
  } else if (cc < 1000) {
    ccComp = 0.99;
    ccSub = 769.8;
  } else if (1001 < cc && cc < 1250) {
    (ccComp = 1), 07;
    ccSub = 771.31;
  }
  resCcComp = cc * ccComp - ccSub;

  // ambiental comp
  var amb;
  var ambSub;

  if (fuel == "Diesel") {
    if (co2 < 79) {
      amb = 5.24;
      ambSub = 398.07;
    } else if (80 < co2 && co2 < 95) {
      amb = 21.26;
      ambSub = 1676.08;
    } else if (96 < co2 && co2 < 120) {
      amb = 71.83;
      ambSub = 6524.16;
    } else if (121 < co2 && co2 < 140) {
      amb = 159.33;
      ambSub = 17158.92;
    } else if (141 < co2 && co2 < 160) {
      amb = 177.19;
      ambSub = 19694.01;
    } else {
      amb = 243.38;
      ambSub = 30326.67;
    }
  } else {
    if (co2 < 99) {
      amb = 4.19;
      ambSub = 387.16;
    } else if (100 < co2 && co2 < 115) {
      amb = 7.13;
      ambSub = 680.91;
    } else if (116 < co2 && co2 < 145) {
      amb = 47.65;
      ambSub = 5353.01;
    } else if (146 < co2 && co2 < 175) {
      amb = 55.52;
      ambSub = 6473.88;
    } else if (176 < co2 && co2 < 195) {
      amb = 141.42;
      ambSub = 21422.47;
    } else {
      amb = 186.47;
      ambSub = 30274.29;
    }
  }
  resAmb = co2 * amb - ambSub;

  // reducao cilindrada e ambiental

  var ccDiscount;
  var ambDiscount;
  var age = calculate_age(dateReg);

  if (age < 1) {
    ccDiscount = 0.1;
  } else if (1 < age && age <= 2) {
    ccDiscount = 0.2;
  } else if (2 < age && age <= 3) {
    ccDiscount = 0.28;
  } else if (3 < age && age <= 4) {
    ccDiscount = 0.35;
  } else if (4 < age && age <= 5) {
    ccDiscount = 0.43;
  } else if (5 < age && age <= 6) {
    ccDiscount = 0.52;
  } else if (6 < age && age <= 7) {
    ccDiscount = 0.6;
  } else if (7 < age && age <= 8) {
    ccDiscount = 0.65;
  } else if (8 < age && age <= 9) {
    ccDiscount = 0.7;
  } else if (9 < age && age <= 10) {
    ccDiscount = 0.75;
  } else {
    ccDiscount = 0.8;
  }


  if (age < 2) {
    ambDiscount = 0.1;
  } else if (2 < age && age <= 4) {
    ambDiscount = 0.2;
  } else if (4 < age && age <= 6) {
    ambDiscount = 0.28;
  } else if (6 < age && age <= 7) {
    ambDiscount = 0.35;
  } else if (7 < age && age <= 9) {
    ambDiscount = 0.43;
  } else if (9 < age && age <= 10) {
    ambDiscount = 0.52;
  } else if (10 < age && age <= 12) {
    ambDiscount = 0.6;
  } else if (12 < age && age <= 13) {
    ambDiscount = 0.65;
  } else if (13 < age && age <= 14) {
    ambDiscount = 0.7;
  } else if (14 < age && age <= 15) {
    ambDiscount = 0.75;
  } else {
    ambDiscount = 0.8;
  }

  var iss = resAmb + resCcComp - resAmb * ambDiscount - resCcComp * ccDiscount;

  var isv = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(hybridDiscount(iss, fuel));
  var finalPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(hybridDiscount(iss, fuel) + price);


  var priceWithExpenses = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(hybridDiscount(iss, fuel) + price + 1250);




  document.getElementById("VIP_MRECT_PREMIUM_ADSENSE").innerHTML +=
    '<h2 style="background-color:#ff6600;color:white; text-align: center;"> ISV 2021 = ' +
    isv +
    "<h2>" +
    '</br> <h2 style="background-color:#ff6600;color:white; text-align: center;"> Preço final = ' +
    finalPrice +
    "<h2>"+ '</br> <h4 style="background-color:#ff6600;color:white; text-align: center;"> Preço incluindo despesas = ' +
    (priceWithExpenses) +
    "<h4>"
}



function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970) + 1;
}

function hybridDiscount(iss, fuel) {
  if (
    fuel.indexOf("Plug-in hybrid") > -1 ||
    fuel.indexOf("Plug-in-Hybrid") > -1
  ) {
    return iss * 0.25;
  } else if (fuel.indexOf("Hybrid") > -1) {
    return iss * 0.6;
  } else return iss;
}
