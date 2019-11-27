const maxSubArray = A => {
  const result = maxSubArrayHelper(A, 0, A.length-1);
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
    sum += A[i];
    if (sum > rightSum) {
      rightSum = sum;
      maxRight = i;
    }
  }

  return { l: maxLeft, r: maxRight, maxSum: leftSum + rightSum }
}

console.log(maxSubArray([3,-2,4,-4]))
console.log(maxSubArray([-3,-2,-4,-4]))
