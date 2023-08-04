import { callFunction } from "./index.js";

const resolvers = {
    message: async (args) => {
      console.log("Calling callFunction...");
      const bal = await callFunction(args.function, "signer", args.parameters);
      console.log("Received token name:", bal);
      return bal;
    },
    tekken: () => {
        return 5;
    },
  };
  
  // module.exports = resolvers;
  export {resolvers}
  