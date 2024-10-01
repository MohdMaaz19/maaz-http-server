import http from 'http'
import fs from 'fs'
import uuid4 from 'uuid4'

const server = http.createServer((req,res)=>{
    if(req.method==='GET' && req.url==='/'){
        res.writeHead(200,{'Content-Type': 'text/html'});
        fs.readFile('index.html','utf8',(error,fileContent)=>{
            if(error){
                res.writeHead(404,{'Content-Type': 'text/plain'})
                res.end('File not found')
            }else{
                res.end(fileContent);
            }
        })
    }else if(req.method === 'GET' && req.url === '/json'){
        res.writeHead(200,{'Content-Type':'application/json'})
        fs.readFile('./data.json','utf8',(error,fileContent)=>{
            if(error){
                res.writeHead(404,{'Content-Type':'text/plain'});
                res.end('File not found');
            }else{
                res.end(fileContent);
            }
        })
    }else if(req.method === 'GET' && req.url === '/uuid'){
        const uuidValue = uuid4();
        res.end(uuidValue);
    }else if(req.method === 'GET' && req.url.startsWith('/status/')){
        const splitValues = req.url.split('/');
        const status = splitValues[2];
        res.writeHead(status,{'Content-Type':'application/json'})
        res.end(JSON.stringify({status:status}));
    }else if(req.method === 'GET' && req.url.startsWith('/delay/')){
        const splitValues = req.url.split('/');
        const delay = splitValues[2];
        
        setTimeout(()=>{
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end(`The delay in response was ${delay} seconds`);
        },delay*1000)
    }
})

const port = 7000;

server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}/`)
})

