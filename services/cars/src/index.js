import server from './config/apollo';

(async () => {
  const port = 4001;
  const { url } = await server.listen({ port });
  console.log(`Cars service ready at ${url}`);
})();
