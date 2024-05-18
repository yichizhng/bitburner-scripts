// A formulas-less (i.e. stole the relevant parts of formulas) HWGW batcher.
// Does not account for cores. It doesn't assume fixed values for security
// increase/decrease, though it won't work well in the places where that matters
// for other reasons.

// Note that it will not target servers with 100 security, if you've managed
// to get a server into that state.

// Setting this higher will be more demanding on your computer.
const BATCH_CAP = 70000;
// Pad hack% by this factor when calculating grow threads. 
const GROW_FUDGE_FACTOR = 1.01;

/** @param {NS} ns */
function getAllServers(ns) {
  return [...(a => (a.forEach(x => ns.scan(x).map(s => a.add(s))), a))(new Set(['.']))];
}

/** @param {NS} ns */
function pickTarget(ns) {
  let hl = ns.getHackingLevel();
  if (hl < 200) return 'joesguns';
  let servers = getAllServers(ns).map(ns.getServer).filter(s => s.moneyMax && s.hasAdminRights);
  let best_metric = 0, best_target = '';
  for (let server of servers) {
    let adjusted_hack_chance = Math.min(1, ns.hackAnalyzeChance(server.hostname) * server.hackDifficulty / server.minDifficulty);
    let adjusted_hack_percent = Math.min(1, ns.hackAnalyze(server.hostname) * server.hackDifficulty / server.minDifficulty);
    let time_mod = (200 + server.requiredHackingSkill * server.minDifficulty) / (50 + hl);
    let metric = server.moneyMax * adjusted_hack_percent * adjusted_hack_chance / time_mod;

    // Prefer servers which are already prepped.
    if (server.hackDifficulty == server.minDifficulty &&
      server.moneyAvailable >= 0.9 * server.moneyMax) {
      metric *= 1.5;
    }
    if (ns.args[0] == server.hostname) metric = Infinity;
    if (metric > best_metric) {
      best_metric = metric;
      best_target = server.hostname;
    }
  }
  return best_target;
}

/** @param {NS} ns */
function getRamMap(ns) {
  return getAllServers(ns).map(ns.getServer)
    .filter(x => x.maxRam && x.hasAdminRights)
    .map(x => [x.hostname, x.maxRam - x.ramUsed])
    .sort((a, b) => a[1] - b[1]);
}

/** @param {NS} ns */
async function prepServer(ns, target) {
  let server = ns.getServer(target);
  let w1t = Math.ceil((server.hackDifficulty - server.minDifficulty) / ns.weakenAnalyze(1));
  while (w1t) {
    ns.print(`Security: ${server.hackDifficulty} / ${server.minDifficulty}`);
    ns.print(`Money: ${server.moneyAvailable} / ${server.moneyMax}`);
    ns.print(`Weaken threads needed: ${w1t}`);
    let ramMap = getRamMap(ns);
    for (let s of ramMap) {
      if (w1t <= 0) break;
      if (s[1] >= 1.75) {
        let at = Math.min(w1t, Math.floor(s[1] / 1.75));
        ns.exec('weaken-once.js', s[0], at, target);
        s[1] -= 1.75 * at;
        w1t -= at;
      }
    }
    if (w1t) {
      ns.print(`Sleeping for ${ns.tFormat(ns.getWeakenTime(target))}`)
      await 0; await 0; await ns.sleep(ns.getWeakenTime(target));
      server = ns.getServer(target);
    } else {
      ns.print('Launched w1; going into w2');
    }
  }
  while (server.moneyAvailable < server.moneyMax) {
    ns.print(`Security: ${server.hackDifficulty} / ${server.minDifficulty}`);
    ns.print(`Money: ${server.moneyAvailable} / ${server.moneyMax}`);
    let ramMap = getRamMap(ns);
    let available_threads = ramMap.map(x => Math.floor(x[1] / 1.75)).reduce((x, y) => x + y);

    let gt = Math.floor(0.95 * available_threads * (ns.growthAnalyzeSecurity(1) + ns.weakenAnalyze(1)) / ns.growthAnalyzeSecurity(1));
    // TODO for someone who cares: if the server is minsec and there's ram left over
    // return instead of waiting
    if (gt > ns.growthAnalyze(target, server.moneyMax / server.moneyAvailable)) {
      gt = Math.ceil(ns.growthAnalyze(target, server.moneyMax / server.moneyAvailable));
    }

    let lgt = 0, lwt = 0;
    while (gt > 0) {
      ramMap = getRamMap(ns);
      let gs = ramMap.at(-1);  // use the biggest server
      let agt = Math.min(gt, Math.floor(gs[1] / 1.75));
      ns.print(agt);
      if (!agt) break;
      ns.exec('grow-once.js', gs[0], agt, target, ns.getWeakenTime(target) - ns.getGrowTime(target));
      gs[1] -= 1.75 * agt;
      gt -= agt;
      if (gs[1] < 1.75) {
        ramMap.pop();
      }
      lgt += agt;
      let wt = Math.ceil(ns.growthAnalyzeSecurity(agt) / ns.weakenAnalyze(1));
      for (let s of ramMap) {
        if (wt <= 0) break;
        if (s[1] >= 1.75) {
          let at = Math.min(wt, Math.floor(s[1] / 1.75));
          ns.exec('weaken-once.js', s[0], at, target);
          s[1] -= 1.75 * at;
          wt -= at;
          lwt += at;
        }
      }
    }
    // Use any remaining ram on weaken
    for (let s of ramMap) {
      if (s[1] >= 1.75) {
        let at = Math.floor(s[1] / 1.75);
        ns.exec('weaken-once.js', s[0], at, target);
        s[1] -= 1.75 * at;
        lwt += at;
      }
    }
    ns.print(`Launched ${lgt} grow threads and ${lwt} weaken threads`);
    ns.print(`Sleeping for ${ns.tFormat(ns.getWeakenTime(target))}`)
    await 0; await 0; await ns.sleep(ns.getWeakenTime(target));
    server = ns.getServer(target);
  }

}

/** @param {NS} ns */
function getHWGWThreads(ns, target) {
  let ramMap = getRamMap(ns);
  let available_threads = ramMap.map(x => Math.floor(x[1] / 1.75)).reduce((x, y) => x + y);

  let best = [0, 0, 0, 0];
  let bestht = 0;
  let hp = ns.hackAnalyze(target);
  for (let hackthreads = 1; GROW_FUDGE_FACTOR * hp * hackthreads < 1; ++hackthreads) {
    let w1threads = Math.ceil((ns.hackAnalyzeSecurity(hackthreads) / ns.weakenAnalyze(1)));
    if (w1threads > 1) break;
    let growthreads = Math.ceil(ns.growthAnalyze(target, 1 / (1 - GROW_FUDGE_FACTOR * hp * hackthreads)));
    let w2threads = Math.ceil(ns.growthAnalyzeSecurity(growthreads) / ns.weakenAnalyze(1));
    let batch_count =
      Math.min(BATCH_CAP, Math.floor(available_threads / (hackthreads + w1threads + growthreads + w2threads)));
    if (batch_count < 10000) {
      // Simulate allocation to get exact values; this is very important at low ram
      let ramMap = getRamMap(ns);
      let batches_launched = 0;
      while (true) {
        let pids = [
          launchHack(ns, target, ht, ramMap, true),
          launchWeaken(ns, target, w1t, ramMap, true),
          launchGrow(ns, target, gt, ramMap, true),
          launchWeaken(ns, target, w2t, ramMap, true)
        ];
        if (pids.some(x => !x)) break;
        batches_launched++;
      }
      batch_count = batches_launched;
    }

    let tht = hackthreads * batch_count;
    if (tht > bestht) {
      best = [hackthreads, w1threads, growthreads, w2threads];
      bestht = tht;
    }
  }

  if (!bestht) {
    if (hp >= 1) {
      // 3 powerful 5 me
      let ht = 0.5;
      let gt = Math.ceil(ns.growthAnalyze(target, 2.1));
      return [ht, 0, gt, Math.ceil((ns.hackAnalyzeSecurity(0.5) + ns.growthAnalyzeSecurity(gt)) / ns.weakenAnalyze(1))]
    } else {
      throw 'something went wrong when calculating hwgw threads';
    }
  }
  ns.print(`Estimated batches: ${bestht / best[0]}`)
  return best;
}

/** @param {NS} ns */
function launchHack(ns, target, threads, ramMap, dry) {
  let script = 'hack-once.js'
  if (threads == 0.5) {
    script = 'hack-half.js';
    threads = 1;
  }
  let hs = ramMap.find(x => x[1] >= threads * 1.7);
  if (!hs) return 0;
  hs[1] -= 1.7 * threads;
  if (dry) return 1;
  return ns.exec(script, hs[0], threads, target, ns.getWeakenTime(target) - ns.getHackTime(target));
}

/** @param {NS} ns */
function launchGrow(ns, target, threads, ramMap, dry) {
  let gs = ramMap.find(x => x[1] >= threads * 1.75);
  if (!gs) return 0;
  gs[1] -= 1.75 * threads;
  if (dry) return 1;
  return ns.exec('grow-once.js', gs[0], threads, target, ns.getWeakenTime(target) - ns.getGrowTime(target));
}

/** @param {NS} ns */
function launchWeaken(ns, target, threads, ramMap, dry) {
  while (threads > 0) {
    let ws = ramMap.find(x => x[1] >= 1.75);
    let at = Math.min(threads, Math.floor(ws[1] / 1.75));
    if (!ws) return 0;
    if (!dry) {
      if (!ns.exec('weaken-once.js', ws[0], at, target)) {
        return 0;
      }
    }
    ws[1] -= 1.75 * at;
    threads -= at;
  }
  return -1;  // so that it doesn't error if threads=0; i'm
  // too lazy to account for hgw in other ways
}

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog('ALL');
  ns.write('hack-once.js', 'export let main = (n,a=n.args) => a[0] && n.hack(a[0], {additionalMsec: a[1]})', 'w');
  ns.write('hack-half.js', 'export let main = (n,a=n.args) => a[0] && n.hack(a[0], {additionalMsec: a[1], threads: 0.5})', 'w');
  ns.write('grow-once.js', 'export let main = (n,a=n.args) => a[0] && n.grow(a[0], {additionalMsec: a[1]})', 'w');
  ns.write('weaken-once.js', 'export let main = (n,a=n.args[0]) => a && n.weaken(a)', 'w');
  const scripts = ['hack-once.js', 'hack-half.js', 'grow-once.js', 'weaken-once.js']
  let pids = [ns.run(scripts[0]), ns.run(scripts[1]), ns.run(scripts[2]), ns.run(scripts[3])];
  for (let pid of pids) {
    while (ns.isRunning(pid)) await ns.sleep(0);
  }

  // Main loop
  while (true) {
    let allServers = [...(a => (a.forEach(x => ns.scan(x).map(s => a.add(s))), a))(new Set(['.']))];
    allServers.forEach(x => ns.scp(scripts, x));

    // This switches targets overly aggressively at low level; try growing joesguns for a while
    // after buying a big ram upgrade to stabilize your hacking level.
    let target = pickTarget(ns);

    let server = ns.getServer(target);
    if (server.hackDifficulty > server.minDifficulty ||
      server.moneyAvailable < server.moneyMax) {
      ns.clearLog();
      ns.print(`Prepping ${target}`);
      await prepServer(ns, target);
    } else {
      ns.clearLog();
      ns.print(`Batching ${target}`);
      let [ht, w1t, gt, w2t] = getHWGWThreads(ns, target);
      ns.print(`HWGW threads: ${ht} / ${w1t} / ${gt} / ${w2t}`);

      let ramMap = getRamMap(ns);
      let batches_launched = 0;
      while (batches_launched < BATCH_CAP) {
        let pids = [
          launchHack(ns, target, ht, ramMap),
          launchWeaken(ns, target, w1t, ramMap),
          launchGrow(ns, target, gt, ramMap),
          launchWeaken(ns, target, w2t, ramMap)
        ];
        if (pids.some(x => !x)) {
          pids.map(ns.kill);
          break;
        }
        batches_launched++;
      }
      ns.print(`Launched ${batches_launched} batches`);
      ns.print(`Sleeping for ${ns.tFormat(ns.getWeakenTime(target))}`)
      await 0; await 0; await ns.asleep(ns.getWeakenTime(target));
    }
    await ns.sleep(0);
  }

} 
