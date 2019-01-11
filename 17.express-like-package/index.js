
// defining an asyc function


async function express(){
    const res = {};
    const req = {};
    
    const data = {res,req};

    // console.log('arguments',': ', arguments);
    
    
    const callbackPos = arguments.length-1;

    
    for (let index = 1; index < callbackPos; index++) {
        const middleware = arguments[index];
        
        // await is telling js to wait for the function to finish to keep going.
        const result = await middleware(data.res,data.req); 
        
        data.res = result.res;
        data.req = result.req;
    }

    // console.log('res',': ', res);
    // console.log('callback',': ', callback);
    
    return callback(data.res,data.req);
}

const callback = (res, req)=>{
    console.log('res',': ', res);
    console.log('req',': ', req);
    return res;
}

const middleware1 = (res,req) => {
    res.user = "diego";
    req.pass = true;
    const result = {res, req}
    return {res, req};
}

const middleware2 = (res,req) => {
    res.user = "pablo";
    req.pass = false;
    const result = {res, req}
    return {res, req};
}


express("/users", middleware1, middleware2, callback)
