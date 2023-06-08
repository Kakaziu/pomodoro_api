export const validEmptyCamps = (body: any, ...args: string[]) => {
  let message = "";

  for (const field of args) {
    if (!body?.[field]) {
      message = `Field ${field} is empty`;
    }
  }

  return message;
};
