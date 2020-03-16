export function calculateWithoutPlan(countMin, valueMin) {
  let priceWithoutPlan = countMin * valueMin;
  let formatePrice = priceWithoutPlan.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return `${formatePrice}`;
}

export function calculateWithPlan(selectedPlan, countMin, valueForMin) {
  let plan = selectedPlan;
  let countMinParams = countMin;
  let diff = countMinParams - plan;
  let calcWithPlan = 0;
  const percent = (10 / 100) * valueForMin * diff;

  calcWithPlan = valueForMin * diff;

  let priceWithPlan = calcWithPlan + percent;

  if (priceWithPlan < 0) {
    priceWithPlan = 0;
  }

  return priceWithPlan.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
