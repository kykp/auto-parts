/**
 * Ф-ия хелпер для получения списка части пагинации
 * @param pages
 * @param stackSize
 * @param page
 */
export const getPaginationStack = (pages: number, stackSize: number, page: string) => {
  if (pages === 0) {
    return [];
  }

  const arrPage = Array.from(Array(pages)).map((_, i) => `${i + 1}`);
  const stacks = Math.ceil(pages / stackSize);
  const stackList = [];

  let currentStack = 0;
  const list = [];

  for (let i = 0; i < stacks; i++) {
    stackList[i] = arrPage.slice((i * stackSize), (i * stackSize) + stackSize);

    if (stackList[i].includes(page)) {
      currentStack = i;
    }
  }

  const lastPage = stackList.length > 0 ? stackList[stackList.length - 1].slice(-1)[0] : 0;

  if (stacks > 1) {
    const lastStackHasOneItem = stackList[stackList.length - 1].length === 1;
    const inLastStack = currentStack === stackList.length - 1;

    const firstNext = currentStack < stackList.length - 1 ? stackList[currentStack + 1][0] : null;
    const lastPrev = currentStack > 0 ? stackList[currentStack - 1][stackList[currentStack - 1].length - 1] : null;

    if (inLastStack && lastStackHasOneItem) {
      if (stacks > 2) {
        list.push('1', '...');
      }
      list.push(...stackList[currentStack - 1], ...stackList[currentStack]);
    } else {

      if (lastPrev) {
        list.push('1', '...', lastPrev);
      }

      list.push(...stackList[currentStack]);

      if (firstNext) {
        list.push(firstNext);

        if (firstNext !== lastPage) {
          list.push('...', lastPage);
        }
      }
    }

  } else {
    list.push(...stackList[currentStack]);
  }

  return list ?? [];
};
