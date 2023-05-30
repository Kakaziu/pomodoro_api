export const validEmptyCamps = (body: any, ...args: string[]) => {
  let message = "";

  for (const field of args) {
    if (!body?.[field]?.length) {
      message = `Field ${field} is empty`;
    }
  }

  return message;
};
