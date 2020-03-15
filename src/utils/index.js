export function calculateWithoutPlan(count, valueMin) {
  let value = count * valueMin;
  let formate = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return `${formate}`;
}

export function calculateWithPlan(selectedPlan, countMin, valueForMin) {
  let plan = selectedPlan;
  let count = countMin;
  let diff = count - plan;
  let calc = 0;
  const percent = (10 / 100) * valueForMin * diff;
  // console.log(percent);
  calc = valueForMin * diff;

  let final = calc + percent;
  if (final < 0) {
    final = 0;
  }
  return final.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
