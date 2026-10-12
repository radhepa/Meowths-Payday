const suffixes = [
  "",
  "K",
  "M",
  "B",
  "T",
  "Qa",
  "Qi",
  "Sx",
  "Sp",
  "Oc",
  "No",
  "Dc",
];
export const money = (value, compact = false) => {
  if ((compact && value >= 1e6) || value >= 1e9) {
    const tier = Math.floor(Math.log10(Math.max(1, value)) / 3);
    return (
      "₽" +
      (tier < suffixes.length
        ? (value / 1000 ** tier).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + suffixes[tier]
        : value.toExponential(2))
    );
  }
  return (
    "₽" +
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};
