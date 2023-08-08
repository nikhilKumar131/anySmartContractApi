import { callFunction } from "./index.js";

const resolvers = {
    message: async (args) => {
      console.log("Calling callFunction...");
      const bal = await callFunction(args.function, "signer", args.parameters);
      console.log("Received token name:", bal);
      return bal;
    },
    payableFunction: async (args) => {
      console.log("Calling callFunction...");
      const bal = await callFunction(args.function, "signer", args.parameters, args.value);
      console.log("Function Successful:");
      return bal;
    },

  };
  
  // module.exports = resolvers;
  export {resolvers}
  