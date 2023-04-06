let n=1 

function print1(n){
    console.log(n);
    print2(2)
}

function print2(n){
    console.log(n);
    print3(3);
}

function print3(n){
    console.log(n)
}

// print1(n);



// recurison ==>   repettition of funtion called recursion 


//  above example can be modify as below -->


function print(n){
   
    if(n==5){
        return
    }
    console.log(n);
    print(n+1) 

    //  this is also calle tail recursion because it called last funtion 
}
print(n)