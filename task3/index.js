const yargs = require('yargs')
const bankAcc=require('./bankAcc')

yargs.command({
    command:"addCustomer",
    describe:"add new customer",
    builder:{
        
        name:{ demandOption:true, type:"string"},
        accNum:{ demandOption:true, type:"number"},
        balance:{ demandOption:true, type:"number"},
      
    },
    handler:function(argv){ bankAcc.addCustomer(argv)}

})

yargs.command({
    command:"showAll",
    describe:"add new customer",
    handler:function(){ bankAcc.showAll()}
})

yargs.command({
    command:"delete",
    describe:"delete customer",
    builder:{
        id:{type:"number"}
    },
    handler:function(argv){ bankAcc.delete(argv)}

})

yargs.command({
    command:"searchAcc",
    describe:"search Customer",
    builder:{
        id:{type:"number"},
        name:{ type:"string"},
       
    },
    handler:function(argv){ bankAcc.searchAcc(argv)}
})
yargs.command({
    command:"updateStat",
    describe:"update status",
    builder:{
        status: { type:"boolean"},
      
    },
    handler:function(argv){ bankAcc.updateStat(argv)}
})
yargs.command({
    command:"withdraw",
    describe:"withdraw operation",
    builder:{
        id:{  type:"number"},
        balance: { type:"number"},
    
    },
    handler:function(argv){ bankAcc.withdrawal(argv)}
})

yargs.command({
    command:"deposit",
    describe:"deposit operation",
    builder:{
        id:{  type:"number"},
        balance: { type:"number"},
    
    },
    handler:function(argv){ bankAcc.deposit(argv)}
})



yargs.argv