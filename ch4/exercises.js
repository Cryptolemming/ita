let operations = 0;

const maxSubArray = (A, type) => {
  if (type === 'brute') {
    return maxSubArrayBrute(A)
  } else {
    const result = maxSubArrayHelper(A, 0, A.length-1);
    return A.slice(result.l, result.r+1)
  }
}

const maxSubArrayBrute = A => {
  const len = A.length;
  const result = A.reduce((acc, num, idx) => {
    let i = idx;
    while (i < len) {
      operations++;
      acc.sum = num;
      if (acc.sum > acc.maxSum) {
        acc.maxSum = acc.sum;
        acc.l = idx;
        acc.r = i;
      }
      i++;
    }

    return acc;
  }, { l: 0, r: 0, sum: 0, maxSum: Number.MIN_SAFE_INTEGER });

  return A.slice(result.l, result.r+1)
}

const maxSubArrayHelper = (A, low, high) => {
  if (low === high) { return { l: low, r: high, maxSum: A[low] } }
  else {
    const mid = Math.floor((low+high) / 2);
    const { l: subLLeft, r: subLRight, maxSum: subLSum } = maxSubArrayHelper(A, low, mid);
    const { l: subRLeft, r: subRRight, maxSum: subRSum } = maxSubArrayHelper(A, mid+1, high);
    const { l: leftLow, r: leftHigh, maxSum: leftSum } = maxContiguousSubArray(A, low, mid);
    const { l: rightLow, r: rightHigh, maxSum: rightSum } = maxContiguousSubArray(A, mid+1, high);
    const { l: crossLeft, r: crossRight, maxSum: crossSum } = maxCrossingSubArray(A, low, mid, high);

    const max = Math.max(leftSum, rightSum, crossSum, subLSum, subRSum)
    if (max === leftSum) { return { l: leftLow, r: leftHigh, maxSum: leftSum }; }
    if (max === rightSum) { return { l: rightLow, r: rightHigh, maxSum: rightSum }; }
    if (max === crossSum) { return { l: crossLeft, r: crossRight, maxSum: crossSum }; }
    if (max === subLSum) { return { l: subLLeft, r: subLRight, maxSum: subLSum }; }
    if (max === subRSum) { return { l: subRLeft, r: subRRight, maxSum: subRSum }; }
  }
}

const maxContiguousSubArray = (A, l, r) => {
  let sum = 0;
  let maxSum = Number.MIN_SAFE_INTEGER;
  let max = l;
  for (let i = l; i <= r; i++) {
    operations++;
    sum += A[i];
    if (sum > maxSum) {
      maxSum = sum;
    }
  }
  return { l: l, r: max, maxSum}
}

const maxCrossingSubArray = (A, l, m, r) => {
  let leftSum = Number.MIN_SAFE_INTEGER;
  let sum = 0;
  let maxLeft = m;
  for (let i = m; i >= l; i--) {
    operations++;
    sum += A[i];
    if (sum > leftSum) {
      leftSum = sum;
      maxLeft = i;
    }
  }

  let rightSum = Number.MIN_SAFE_INTEGER;
  sum = 0;
  let maxRight = m;
  for (let i = m+1; i <= r; i++) {
    operations++;
    sum += A[i];
    if (sum > rightSum) {
      rightSum = sum;
      maxRight = i;
    }
  }

  return { l: maxLeft, r: maxRight, maxSum: leftSum + rightSum }
}

console.log('brute force:\n')
let sample = 1;
while (sample <= 20) {
  // brute force
  let operationsAtStart = operations;

  let start = process.hrtime()
  maxSubArray([...Array(sample).keys()], 'brute')
  let end = process.hrtime(start)

  console.log(`BF - sample: ${sample}, time: ${end[1] / 1000000}ms, operations: ${operations-operationsAtStart}`)

  // dnc
  operationsAtStart = operations;

  start = process.hrtime()
  maxSubArray([...Array(sample).keys()], 'dnc')
  end = process.hrtime(start)

  console.log(`DNC - sample: ${sample}, time: ${end[1] / 1000000}ms, operations: ${operations-operationsAtStart}\n`)
  sample++;
}

/*
  ### operations faster in DNC at n = 15 according to implementation

  # DNC - nlogn (contiguous = 1, crossing = 1) = ~ (n*2) * logn operations
    n = 15 = (15*2) * (4) = ~ 120 operations
  # BF - (n(n-1)) / 2 = (n^2 - n) / 2
    n = 15 = (15^2 - 15) / 2 = 105 operations

  ### expected at n = 20

  # DNC
    (20*2) * 4.5 = 180 operations
  # BF
    (20^2 - 20) / 2 = 190 operations
*/
