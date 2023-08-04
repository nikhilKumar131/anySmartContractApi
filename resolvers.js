import { callFunction } from "./index.js";

const resolvers = {
    message: async (args) => {
      console.log("Calling callFunction...");
      const bal = await callFunction(args.function, "signer", ["0xF44316E37bC542bFF6eDdb33Cc11aabdc4c432A1"]);
      console.log("Received token name:", bal);
      return bal;
    },
    tekken: () => {
        return 5;
    },
  };
  
  // module.exports = resolvers;
  export {resolvers}
  