const insertionSort = arr => {
  const len = arr.length;

  for(let i = 1; i < len; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] < key) {
      arr[j+1] = arr[j];
      arr[j] = key;
      j--;
    }
  }

  return arr;
}

const linearSearch = (arr, v) => {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    if (arr[i] === v) { return i; }
  }

  return null;
}

const addBinaryNumbers = (arr1, arr2) => {
  const len = arr1.length;
  const result = new Array(len+1).fill(0);
  let r = 0;

  for (let i = len - 1; i >= 0; i--) {
    const sum = arr1[i] + arr2[i] + r;

    if (sum === 3) { result[i+1] = 1; }
    if (sum === 2) { result[i+1] = 0; r = 1; }
    if (sum <= 1) { result[i+1] = sum; }
  }

  result[0] = r;
  return result;
}

const mergeSort = arr => {
  mergeSortHelper(arr, 0, arr.length-1);
  return arr;
}

const mergeSortHelper = (arr, p, q) => {
  if (p >= q) { return; }

  const mid = Math.floor((p+q)/2);
  mergeSortHelper(arr, p, mid);
  mergeSortHelper(arr, mid+1, q);
  merge(arr, p, mid, q)
}

const merge = (arr, l, m, r) => {
  const L = arr.slice(l, m+1);
  const R = arr.slice(m+1, r+1);
  L.push(Number.MAX_SAFE_INTEGER)
  R.push(Number.MAX_SAFE_INTEGER)
  let Li = 0;
  let Ri = 0;
  for (let i = l; i <= r; i++) {
    if (L[Li] < R[Ri]) {arr[i] = L[Li]; Li++;}
    else {arr[i] = R[Ri]; Ri++; }
  }
}

const mergeSortNoSentinels = arr => {
  return mergeSortHelperNoSentinels(arr, 0, arr.length - 1);
}

const mergeSortHelperNoSentinels = (arr, p, q) => {
  if (p >= q) { return; }

  const mid = Math.floor((p+q)/2)
  mergeSortHelperNoSentinels(arr, p, mid)
  mergeSortHelperNoSentinels(arr, mid+1, q)
  mergeNoSentinels(arr, p, mid, q)
}

const mergeNoSentinels = (arr, l, m, r) => {
  const L = arr.slice(l, m+1)
  const R = arr.slice(m+1, r+1)
  let Li = 0
  let Ri = 0
  const lenL = L.length
  const lenR = R.length
  let breakPoint = l;
  for (let i = l; i <= r; i++) {
    if (Ri === lenR) { empty = 'R'; break; }
    if (L[Li] <= R[Ri]) {
      arr[i] = L[Li];
      Li++
    } else {
      arr[i] = R[Ri];
      Ri++
    }

    if (Li === lenL || Ri === lenR) { breakPoint = i+1; break; }
  }

  const remainingL = L.slice(Li)
  const remainingR = R.slice(Ri)
  arr.splice(breakPoint, remainingL.length, ...remainingL)
  arr.splice(breakPoint, remainingR.length, ...remainingR)
}

const insertionSortRecursive = A => {
  if (typeof A !== 'object') { throw new Error('Please enter an array')}
  return A.length <= 1 ? A : insertionSortRecursiveHelper(A, 0, 1, A[1]);
}

const insertionSortRecursiveHelper = (A, j, i, key) => {
  if (i >= A.length) { return A; }
  if (j < 0) { return insertionSortRecursiveHelper(A, i, i+1, A[i+1]); }
  if (A[j] > key) {
    A[j+1] = A[j];
    A[j] = key;
    return insertionSortRecursiveHelper(A, j-1, i, key)
  }
  return insertionSortRecursiveHelper(A, i, i+1, A[i+1]);
}

const insertSortBinarySearch = A => {
  if (A.length <= 1) { return A; }
  for (let i = 1; i < A.length; i++) {
    const key = A[i];
    let j = i - 1;
    if (j >= 0 && A[j] > key) {
      const posToInsert = binarySearch(A, 0, j, key);
      A.splice(posToInsert, 0, key)
      A.splice(i+1, 1);
    }
  }

  return A;
}

const binarySearch = (A, l, r, key) => {
  const mid = Math.floor((l+r)/2);
  if (key < A[mid]) {
    // added mid - 1 >= l for mergeInertionSort binary search boundaries
    if (mid - 1 >= 0 && mid - 1 >= l) {
      if (key > A[mid-1]) { return mid; }
      else { return binarySearch(A, l, mid-1, key); }
    }
    return mid;
  }
  else {
    if (mid + 1 >= r || key < A[mid+1]) { return mid + 1; }
    return binarySearch(A, mid+1, r, key)
  }
}

const mergeInsertionSort = (A, k) => {
  if (A.length <= 1) { return A; }
  mergeInsertionSortHelper(A, k, 0, A.length-1)
  return A;
}

const mergeInsertionSortHelper = (A, k, p, q) => {
  if ((q-p+1) <= k) {
    insertionSortHelper(A, p, q);
    return;
  }

  const mid = Math.floor((p+q) / 2);
  mergeInsertionSortHelper(A, k, p, mid)
  mergeInsertionSortHelper(A, k,mid+1, q)
  mergeInsertion(A, p, mid, q);
}

const insertionSortHelper = (A, l, r) => {
  for (let i = l+1; i <= r; i++) {
    const key = A[i];
    let j = i - 1;
    if (A[j] > key) {
      console.log('here')
      const pos = binarySearch(A, j, i, key)
      A.splice(pos, 0, key)
      A.splice(i+1, 1);
    }

  }
}

const mergeInsertion = (A, l, m, r) => {
  const L = A.slice(l, m+1);
  L.push(Number.MAX_SAFE_INTEGER)
  const R = A.slice(m+1, r+1);
  R.push(Number.MAX_SAFE_INTEGER);
  let Li = 0;
  let Ri = 0;
  for (let i = l; i <= r; i++) {
    if (L[Li] <= R[Ri]) {
      A[i] = L[Li];
      Li++;
    } else {
      A[i] = R[Ri];
      Ri++;
    }
  }
}

// count inversions with mergesort
const modifiedMergeSort = A => {
  return A.length <= 1 ? 0 : modifiedMergeSortHelper(A, 0, A.length-1);
}

const modifiedMergeSortHelper = (A, p, q) => {
  if (p >= q) { return 0; }

  const mid = Math.floor((p+q)/2);
  const leftInversions = modifiedMergeSortHelper(A, p, mid);
  const rightInversions = modifiedMergeSortHelper(A, mid+1, q)
  const totalInversions = modifiedMerge(A, p, mid, q) + leftInversions + rightInversions;
  return totalInversions;
}

const modifiedMerge = (A, l, m, r) => {
  let inversions = 0;
  const L = A.slice(l, m+1);
  const R = A.slice(m+1, r+1);
  let Li = 0;
  let Ri = 0;
  const lenL = L.length;
  const lenR = R.length;
  let pos = l;
  while (Li < lenL && Ri < lenR) {
    if (L[Li] <= R[Ri]) {
      A[pos] = L[Li];
      Li++;
    } else {
      A[pos] = R[Ri];
      Ri++;
      inversions++;
    }
    pos++;
  }

  if (Ri < lenR) {
    while (pos <= r) {
      A[pos] = R[Ri];
      pos++; Ri++;
    }
  }

  if (Li < lenL) {
    while (pos <= r) {
      A[pos] = L[Li];
      pos++; Li++;
      inversions++;
    }
    inversions--;
  }
  return inversions;
}

console.log(modifiedMergeSort([3,2,1]))
