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

/** @param {NS} ns */
export async function main(ns) {
  let t = new Date().getTime(); 
  let rng = new WHRNG(t);
  let spin = () => Math.floor(rng.random() * 37)
  let spins = Array.from(Array(100), spin);
  let o = Date.prototype.getTime;
  Date.prototype.getTime = function() {
    return t;
  }
  ns.print('kill this script after you enter roulette')
  ns.print('predicted roulette spins: ' + spins);
  ns.atExit(() => {
    Date.prototype.getTime = o;
  });
  return new Promise(() => 0);
}
