const sortQueryBuilder = function (req, res, next) {
  // ex) /expenses?sort=-date (desc)
  // ex) /expenses?sort=date  (asc)

  const sortBy = req?.query?.sort;

  if (sortBy) {
    const sortByIndexZero = sortBy.split("")[0];
    req["sortBy"] = {
      field: sortBy,
      order: "asc",
    };

    if (sortByIndexZero === "-") {
      req.sortBy.field = sortBy.substring(1);
      req.sortBy.order = "desc";
    }
  }

  return next();
};

module.exports = {
  sortQueryBuilder,
};
