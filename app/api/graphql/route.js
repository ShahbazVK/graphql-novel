import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prismaClientSingleton } from "../../../prisma/db";

const typeDefs = `#graphql
  type Novel{
    id: ID!
    title: String
    image: String
  
    createdAt: String
    updatedAt: String
  
    authors: [Author]
  }

  type Author{
    id: ID!
    name: String
  }

  type Query {
    novels: [Novel]
    novel(id: ID!): Novel
  }

  input AuthorInput{
    name: String
  }

  type Mutation {
    addNovel(title: String, image: String, authors: [AuthorInput]): Novel
    deleteNovel(id: ID!): Novel
    updateNovel(id: ID!, title: String, image: String): Novel
  }
`;

const resolvers = {
  Query: {
    novels: async (parent, args, context) => {
      const data = await prismaClientSingleton.novel.findMany({
        include: {
          authors: true,
        },
      });
      return data;
    },
    novel: async (parent, { id }) => {
      return prismaClientSingleton.novel.findUnique({
        where: {
          id,
        },
        include: {
          authors: true,
        },
      });
    },
  },
  Mutation: {
    addNovel: async (_, data) => {
      const resp = await prismaClientSingleton.novel.create({
        data: { ...data, authors: { create: data.authors } },
      });
      return resp;
    },
    deleteNovel: async (_, { id }) => {
      return prismaClientSingleton.novel.delete({
        where: { id },
      });
    },
    updateNovel: async (_, { id, title, image }) => {
      return prismaClientSingleton.novel.update({
        where: {
          id,
        },
        data: {
          title,
          image,
        },
        include: {
          authors: true,
        },
      });
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
