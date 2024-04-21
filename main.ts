import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views')
app.use(express.static(__dirname + '/public'));

const isPrime = (n: number) => {
  // All primes > 3 are of form 6*x + 1 or 6*x - 1
  if (n === 2 || n === 3) return true; 
  if (n < 2 || n % 2 === 0) return false;
  if (n < 9) return true;
  if (n % 3 === 0) return false;
  // Every composite number i has a prime divisor less than or equal to sqrt(i)
  const lim = Math.sqrt(n);
  let f = 5;
  while (f <= lim){
    if (n % f === 0) return false;
    if (n % (f + 2) === 0) return false;
    f += 6;
  }
  return true;
}

const isInteger = (value: string) =>  /^-?\d+$/.test(value);

app.get('/', (req: Request, res: Response) => {
  const fileTarget = "src/index.html";
  console.log(__dirname); 
  res.render('index');
});

app.get('/myapi/checkprime', (req: Request, res: Response) => {
  const input = req.query.number?.toString();
  if (!input || !isInteger(input)) return res.status(400).send("Malformed input");
  
  const integer = Number(input);
  if (integer >= Number.MAX_SAFE_INTEGER) return res.status(400).send("Input number is too big")

  res.send({"isPrime": isPrime(integer)});
});

app.get('/myapi/sum', (req: Request, res: Response) => {
  const input = req.query.numbers?.toString();
  const inputArray = input?.split(',');
  if (!inputArray) return 
  
  let sum = 0;
  for (const elem of inputArray) {
    if (!isInteger(elem)) return res.status(400).send("Malformed input");
    sum = sum + Number(elem)
  }
  res.send({"result": sum, "isPrime": isPrime(sum)});
});

module.exports = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});