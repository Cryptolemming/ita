const maxSubArray = A => {
  return maxSubArrayHelper(A, 0, A.length-1)
}

const maxSubArrayHelper = (A, low, high) => {
  if (low === high) { return { l: low, r: high, maxSum: A[low] }; }
  else {
    const mid = Math.floor((low+high) / 2);
    const { l: leftLow, r: leftHigh, maxSum: leftSum } = maxContiguousSubArray(A, low, mid);
    const { l: rightLow, r: rightHigh, maxSum: rightSum } = maxContiguousSubArray(A, mid+1, high);
    const { l: crossLeft, r: crossRight, maxSum: crossSum } = maxCrossingSubArray(A, low, mid, high);
    if (leftSum >= rightSum && leftSum >= crossSum) {
      return { l: leftLow, r: leftHigh, maxSum: leftSum }
    } else if (rightSum >= leftSum && rightSum >= crossSum) {
      return { l: rightLow, r: rightHigh, maxSum: rightSum }
    } else {
      return { l: crossLeft, r: crossRight, maxSum: crossSum }
    }
  }
}

const maxContiguousSubArray = (A, l, r) => {
  const { l: newLeft, r: newRight, maxSum } = A.reduce((acc, num, idx) => {
    acc.sum += num;
    if (acc.sum > acc.maxSum) {
      acc.maxSum = acc.sum;
      acc.r = acc.l + idx;
    }

    return acc;
  }, { l, r: l, sum: 0, maxSum: Number.MIN_SAFE_INTEGER })

  return { l: newLeft, r: newRight, maxSum }
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
  return { l: maxLeft, r: maxRight, maxSum: maxLeft + maxRight}
}

console.log(maxSubArray([3,-2,4,-4]))
