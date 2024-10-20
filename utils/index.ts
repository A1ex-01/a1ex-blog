export const getActive = (href: string, pathName: string) => {
  return pathName.startsWith(href);
};
