export const compare = function (a, b) {
  const bandA = a.timeStamp;
  const bandB = b.timeStamp;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
};
