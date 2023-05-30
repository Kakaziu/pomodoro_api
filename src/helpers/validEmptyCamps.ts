export const validEmptyCamps = (body: any, ...args: string[]) => {
  let message = "";

  console.log(body);
  console.log(args);
  for (const field of args) {
    if (!body?.[field]) {
      message = `Field ${field} is empty`;
    }
  }

  return message;
};
