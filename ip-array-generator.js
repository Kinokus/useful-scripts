function generateIpArray(template) {
  // you can send ip as
  // 1.3.5.7
  // 1-10.3.5.7
  // 1.3.5.1-10
  // 1-10.3.5.1-10

  const rawTetrades = template.split('.');
  if (rawTetrades.length !== 4) {
    return [];
  }
  let maxDiapasoneLength = 1;
  const rawTetradesConverted = rawTetrades.map((t) => {
    const tSplitted = t.split('-');
    const tRange = _.range(parseInt(tSplitted[0], 10), parseInt(tSplitted[tSplitted.length - 1], 10) + 1);
    maxDiapasoneLength = maxDiapasoneLength > tRange.length ? maxDiapasoneLength : tRange.length;
    return tRange;
  });

  let steps = [];

  rawTetradesConverted.forEach(async (rtc, rtcIdx) => {
    rtc.forEach((rtce) => {
      steps[rtcIdx] = steps[rtcIdx] || [];
      if (!rtcIdx) {
        steps[rtcIdx].push([rtce]);
      } else {
        steps[rtcIdx - 1].forEach((st) => {
          steps[rtcIdx].push([...st, rtce]);
        });
      }
    });
  });

  return _.map(_.last(steps), (el) => el.join('.'));
}