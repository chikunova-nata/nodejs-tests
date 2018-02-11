const funcs = {
    getRoute53: () => 'not important',
    funcA: async (id) => {
      let url = funcs.getRoute53() + id
      return await funcs.funcB(url);
    },
    funcB: async () => null
  }
  
  module.exports = funcs