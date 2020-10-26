import * as apiClient from '../api/apiClient';

const resolvers = {
  Query: {
    allCars: () => apiClient.getAllCars(),
  },
  Mutation: {
    createCar: (_, args) => apiClient.createCar(args),
  },
  Car: {
    __resolveReference: (ref) => apiClient.findCarById(+ref.id),
  },
};

export default resolvers;
