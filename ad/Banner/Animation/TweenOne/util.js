import React from 'react';
import deepEql from 'deep-eql';

export function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

export function startConvertToEndUnit(target, style, num, unit, dataUnit, fixed, isOriginWidth) {
  const horiz = /(?:Left|Right|Width|X)/i.test(style) || isOriginWidth;
  let t = style.indexOf('border') !== -1 ? target : target.parentNode || document.body;
  t = fixed ? document.body : t;
  let pix;

  if (unit === '%') {
    pix = parseFloat(num) / 100 * (horiz ? t.clientWidth : t.clientHeight);
  } else if (unit === 'vw') {
    pix = parseFloat(num) * document.body.clientWidth / 100;
  } else if (unit === 'vh') {
    pix = parseFloat(num) * document.body.clientHeight / 100;
  } else if (unit && unit.match(/em/i)) {
    pix = parseFloat(num) * 16;
  } else {
    pix = parseFloat(num);
  }
  if (dataUnit === '%') {
    pix = pix * 100 / (horiz ? t.clientWidth : t.clientHeight);
  } else if (dataUnit === 'vw') {
    pix = parseFloat(num) / document.body.clientWidth * 100;
  } else if (dataUnit === 'vh') {
    pix = parseFloat(num) / document.body.clientHeight * 100;
  } else if (dataUnit && dataUnit.match(/em/i)) {
    pix = parseFloat(num) / 16;
  }
  return pix;
}

export function parsePath(path) {
  if (typeof path === 'string') {
    if (path.charAt(0).match(/m/i)) {
      const domPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      domPath.setAttributeNS(null, 'd', path);
      return domPath;
    }
    return document.querySelector(path);
  } else if (path.style) {
    return path;
  }
  throw new Error('Error while parsing the path');
}

export function getTransformValue(t, supports3D) {
  if (typeof t === 'string') {
    return t;
  }
  const perspective = t.perspective;
  const angle = t.rotate;
  const rotateX = t.rotateX;
  const rotateY = t.rotateY;
  const sx = t.scaleX;
  const sy = t.scaleY;
  const sz = t.scaleZ;
  const skx = t.skewX;
  const sky = t.skewY;
  const xPercent = t.xPercent || 0;
  const yPercent = t.yPercent || 0;
  const translateX = xPercent ? 0 : t.translateX;
  const translateY = yPercent ? 0 : t.translateY;
  const translateZ = t.translateZ || 0;
  const percent = xPercent || yPercent ? `translate(${xPercent || `${
      translateX}px`},${yPercent || `${translateY}px`})` : '';
  const sk = skx || sky ? `skew(${skx}deg,${sky}deg)` : '';
  const an = angle ? `rotate(${angle}deg)` : '';
  let ss;
  if (!perspective && !rotateX && !rotateY && !translateZ && sz === 1 || !supports3D) {
    ss = sx !== 1 || sy !== 1 ? `scale(${sx},${sy})` : '';
    const translate = percent || `translate(${translateX}px,${
        translateY}px)`;
    return `${translate} ${an} ${ss} ${sk}`;
  }
  ss = sx !== 1 || sy !== 1 || sz !== 1 ? `scale3d(${sx},${sy},${sz})` : '';
  const rX = rotateX ? `rotateX(${rotateX}deg)` : '';
  const rY = rotateY ? `rotateY(${rotateY}deg)` : '';
  const per = perspective ? `perspective(${perspective}px)` : '';
  const translate3d = percent ? `${percent} translate3d(0,0,${translateZ}px)` :
    `translate3d(${translateX}px,${translateY}px,${translateZ}px)`;
  return `${per} ${translate3d} ${ss} ${an} ${rX} ${rY} ${sk}`;
}
