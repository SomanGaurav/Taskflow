


export const liveMessage = async(req , res)=>{
    
    res.setHeader('Content-Type' ,'text/event-stream');
    res.setHeader('Cache-Control' , 'no-cache');
    res.setHeader('Connection' , 'keep-alive');

    res.flushHeaders(); 

    const interval = setInterval(() => {
        const data = {
            message : "Hello from the server" , 
            timestamp : new Date().toISOString() , 

        }

        res.status(200).write(`data : ${JSON.stringify(data)}`)
        console.log("Hello");
    } ,5000); 

    const heartbeatId = setInterval(() => {
        res.write(': heartbeat\n\n'); // A comment (empty event)
      }, 15000);


    req.on('close' , ()=>{
        clearInterval(interval); 
        clearInterval(heartbeatId);
        console.log("Client Disconnected"); 
    })
}