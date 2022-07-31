export const updateFavs = async (type, id) => {
  await type({
    where: { id },
    data: { favoriteId: { set: null } },
  });
};
