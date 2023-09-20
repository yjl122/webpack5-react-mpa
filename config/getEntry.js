const path = require('path');

const getEntry = (page) => {
  const pages = path.resolve(process.cwd(), 'src/pages');
  if (page) {
    return {
      [page]: [path.resolve(pages, page, './index')],
    };
  }
  return [];
};
module.exports = getEntry;
