class WHRNG {
  s1 = 0;
  s2 = 0;
  s3 = 0;

  constructor(n) {
    this.s1 = this.s2 = this.s3 = (n/1000)%30000;
  }

  step() {
    this.s1 = (171 * this.s1) % 30269;
    this.s2 = (172 * this.s2) % 30307;
    this.s3 = (170 * this.s3) % 30323;
  }

  random() {
    this.step();
    return (this.s1 / 30269.0 + this.s2 / 30307.0 + this.s3 / 30323.0) % 1.0;
  }
}

function trustMeBro(elem) {
  for (let p in elem) {
    if (p.startsWith('__reactProps')) {
  	  elem[p].onClick({isTrusted: true});
	  }
  }
}

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog('asleep')
  ns.clearLog();
  let d = globalThis['document'];
  if (d.querySelector('input[placeholder="Amount to play"]')) {
    ns.print('please start the script OUTSIDE of roulette and then enter');
    ns.exit();
  }
  ns.print('waiting for player to enter casino...')
  let t = new Date().getTime(); 
  let rng = new WHRNG(t);
  let spin = () => Math.floor(rng.random() * 37)
  let spins = Array.from(Array(100), spin);
  let o = Date.prototype.getTime;
  Date.prototype.getTime = function() {
    return t;
  }
  let r = Math.random;
  ns.atExit(() => {
    Date.prototype.getTime = o;
    Math.random = r;
  });
  while (true) {
    if (d.querySelector('input[placeholder="Amount to play"]')) break;
    await ns.asleep(0);
  }
  let input = d.querySelector('input[placeholder="Amount to play"]');
  Object.getOwnPropertyDescriptor(eval('window').HTMLInputElement.prototype, "value").set.call(input, '10000000')
  input.dispatchEvent(new Event('input', {bubbles: true}))
  await ns.asleep(0);
  // Gather up the buttons for later
  let deez = [];
  let buttons = d.querySelectorAll('button');
  for (let button of buttons) {
    if (button.innerText == +button.innerText) {
      deez[button.innerText] = button;
    }
  }
  
  Math.random = function() {
    return 0.9 * r();
  }
  for (let i = 0; i < 28; ++i) {
    trustMeBro(deez[spins[i]]);
  }
  await ns.asleep(2000);
}
