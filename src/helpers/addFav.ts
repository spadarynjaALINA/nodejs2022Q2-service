export const addFavs = async (type, id) => {
  if (await type.findUnique({ where: { id } })) {
    const favorites =
      (await type.findFirst()) || (await type.create({ data: {} }));
    const id = favorites.id;
    return type.update({
      where: { id },
      data: { favoriteId: id },
    });
  }
};
