const fs = require('fs')
const { argv } = require('process')

class accBank{
nyData= null
//..........read and write data............
readData(){
    try{
        this.myData= JSON.parse(fs.readFileSync('all.json').toString())
        if(!Array.isArray(this.myData)) throw new Error ('')  
    }
    catch(e){
        this.myData=[]
    }
}
writeData(){
    fs.writeFileSync('all.json',JSON.stringify(this.myData))
}

//............add customer........
addCustomer(custAcc){
let customer= {
    id:new Date().getTime(),
    name:custAcc.name,
    accNum:custAcc.accNum,
    balance:custAcc.balance,
    status:true
}
this.readData()
this.myData.push(customer)
this.writeData()

}

//..................show all.........................
showAll(){
    this.readData()
    this.myData.forEach(customer=>{
        console.log(`${customer.id} - ${customer.name} - ${customer.balance} - ${customer.status}`)
    })
}

//..............delete customer............
delete(argv){
    this.readData()
    let x = this.myData.findIndex(customer =>  customer.id== argv.id)
    if(x==-1) return console.log('not found');
    this.myData.splice(x,1)
    this.writeData()
}
//................srearch....................
searchAcc(argv){

    let searchKey = null;
    for(let x in argv) if(x != "_" && x != "$0") searchKey = x;
    this.readData();
    let result = this.myData.filter(customer => customer[searchKey] == argv[searchKey]);
    console.log(result);
    /*let searchkey=null
    for(let x in argv) if (x!="_"&& x!="$") searchkey =x
    this.readData()
    let result=this.myData.filter( customer=> customer[searchkey] == argv[searchkey])
    result.forEach(customer=>{
        console.log(`${customer.id}- ${customer.name}${customer.accNum}-${customer.balance} -${customer.status}`)
    }) */
}


//......update status..................
updateStat(argv){
    this.readData()
    let z=this.myData.findIndex(customer => customer.status == argv.status )
    if(z==true){  
        //this.showAll()
        return console.log("this customer found") 
    }
    else{
        this.writeData()
        console.log("this customer not found in system");
    }
}

//.............withdraw..........................


// withdraw(argv){ 
//     const balance = argv.balance
//   this.readData()
//   let withdr=this.myData.findIndex(customer => customer.id == argv.id)
//   if(!withdr.status||withdr>customer.balance||balance>5000 ||!withdr) return(console.log("Your balance is not enough to withdraw"))

//   else{
      
//       this.updateCus(id,balance,false)
  
//   }

 
// }


//...........................deposit......................

// deposit(argv){
//     const balance = argv.balance
  
//     this.readData()
//     //let depo=this.myData.findIndex(customer => customer.id ==argv.id)
//     let depo=this.myData.findIndex(customer => customer.id ==argv.id)

//     if(balance > 10000||!depo||!depo.status) return console.log('Deposit Failure')
  
    
//     else{

//         this.updateCus(id, balance,true);
       

//     }
// }


// updateCus(id,balance , istrue){
//     this.readData()
//     let i = this.myData.find(customer =>  customer[id]==argv[id])
//     if(i==-1) return console.log('Customer Not Found');
//     else{
//         if(istrue) this.myData[i].balance=this.myData[i].balance + balance;
//         else this.myData[i].balance=this.myData[i].balance - balance;
//         this.writeData()
//         this.showAll();
//     }

// }


deposit(argv) {
    this.readData();
    let i= this.myData.findIndex((client) => client.id == argv.id);
    if (i == -1) return console.log("not found");
    let oldBalance = this.myData[i].balance;
    if (this.myData[i].status) {
      if (argv.balance > 10000) {
        return console.log("you cant deposit more than 10000");
      } else {
        this.myData[i].balance += argv.balance;
        this.writeData();
        console.log(`the operation succes`);
        console.log([{ id: this.myData[i].id, "old balance": oldBalance, "current balance": this.myData[i].balance }]);
      }
    } else {
      console.log("not allowed");
    }
  }

  //.....................withdraw.................
  withdrawal(argv) {
    this.readData();
    let i = this.myData.findIndex((client) => client.id == argv.id);
    if (i == -1) return console.log("not found");
    let oldBalance = this.myData[i].balance;
    if (this.myData[i].status) {
      if (argv.balance > 5000) {
        return console.log("you cant withdraw more than 5000");
      } else {
        if (argv.balance > oldBalance) {
          return console.log(`your balance is not enough to complete the process - your balance is ${oldBalance}`);
        } else {
          this.myData[i].balance -= argv.amount;
          this.writeDate();
          console.log(`the operation success`);
          console.table([{ id: this.myData[i].id, "old balance": oldBalance, "current balance": this.myData[i].balance }]);
        }
      }
    } else {
      console.log(" not allowed");
    }
  }
  
}

let myAccBank = new accBank()
module.exports=myAccBank