const http= require('http');

const server= http.createServer((req,res)=>{
    const {url} = req;
    if(url === '/home')
    {res.setHeader('Content-Type', 'text/HTML');
     res.write('<HTML>');
     res.write('<HEAD><TITLE>My Node.js respomce</TITLE></HEAD>');
     res.write('<BODY><h1>Welcome home</h1></BODY>');
     res.write('</HTML>'); 
     res.end();
    }
    else if(url === '/about')
    {res.setHeader('Content-Type', 'text/HTML');
     res.write('<HTML>');
     res.write('<HEAD><TITLE>My Node.js respomce</TITLE></HEAD>');
     res.write('<BODY><h1>Welcome to about us page</h1></BODY>');
     res.write('</HTML>'); 
     res.end();
    }
    else if(url === '/node')
    {res.setHeader('Content-Type', 'text/HTML');
     res.write('<HTML>');
     res.write('<HEAD><TITLE>My Node.js respomce</TITLE></HEAD>');
     res.write('<BODY><h1>Welcome to my node.js project</h1></BODY>');
     res.write('</HTML>'); 
     res.end();
    }
});

server.listen(4000);