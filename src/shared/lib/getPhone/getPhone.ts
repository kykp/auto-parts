export const getPhone = (phone: string | null) => {
  if (!phone) return '-';

  let indexNum = 0;
  const mask = '+X (XXX) XXX-XX-XX';

  return mask.split('').map((el) => {
    if (el === 'X') {
      indexNum++;
      return phone[indexNum - 1];
    }
    return el;
  }).join('').replace('++', '+');
};
