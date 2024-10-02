export const getPrismaQuery = (id: number) => {
  return {
    where: { id },
    include: {
      filters: {
        where: {
          archive: false,
        },
        include: {
          options: {
            where: {
              archive: false,
            },
          },
        },
      },
      product: {
        where: { archive: false },
        include: {
          filterOptions: {
            where: { archive: false },
            select: {
              id: true,
            },
          },
        },
      },
    },
  };
};

export const getFilterMap = (data) => {
  const { idMap, nameToIdMap } = data.filters.reduce(
    (map, filter) => {
      const { idMap, nameToIdMap } = map;
      const { id, name } = filter;
      nameToIdMap[name] = id;
      idMap[id] = filter.options.reduce(
        (map, option) => {
          const { optionIdMap, optionNameToIdMap } = map;
          const { id, name } = option;
          optionIdMap[id] = true;
          optionNameToIdMap[name] = id;
          return map;
        },
        { optionIdMap: {}, optionNameToIdMap: {} },
      );
      return map;
    },
    { idMap: {}, nameToIdMap: {} },
  );

  const productOptionsMap = data.product.reduce((obj, item) => {
    item.filterOptions.forEach((option) => {
      obj[option.id] = true;
    });

    return obj;
  }, {});
  return { idMap, nameToIdMap, productOptionsMap };
};