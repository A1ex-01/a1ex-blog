export const getActive = (href: string, pathName: string) => {
  return pathName.startsWith(href);
};

export const getFragmentWorker = (fragment: string, lang: "tsx") => {
  const parsed = `
\`\`\`${lang}
${fragment}
\`\`\`
`;
  return parsed;
};
