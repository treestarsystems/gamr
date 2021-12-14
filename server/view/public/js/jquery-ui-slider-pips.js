/*! jQuery-ui-Slider-Pips - v1.11.4 - 2016-09-04
* Copyright (c) 2016 Simon Goellner <simey.me@gmail.com>; Licensed MIT */

/* HORIZONTAL */
/* increase bottom margin to fit the pips */
.ui-slider-horizontal.ui-slider-pips {
  margin-bottom: 1.4em;
}

/* default hide the labels and pips that arnt visible */
/* we just use css to hide incase we want to show certain */
/* labels/pips individually later */
.ui-slider-pips .ui-slider-label,
.ui-slider-pips .ui-slider-pip-hide {
  display: none;
}

/* now we show any labels that we've set to show in the options */
.ui-slider-pips .ui-slider-pip-label .ui-slider-label {
  display: block;
}

/* PIP/LABEL WRAPPER */
/* position each pip absolutely just below the default slider */
/* and also prevent accidental selection */
.ui-slider-pips .ui-slider-pip {
  width: 2em;
  height: 1em;
  line-height: 1em;
  position: absolute;
  font-size: 0.8em;
  color: #999;
  overflow: visible;
  text-align: center;
  top: 20px;
  left: 20px;
  margin-left: -1em;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ui-state-disabled.ui-slider-pips .ui-slider-pip {
  cursor: default;
}

/* little pip/line position & size */
.ui-slider-pips .ui-slider-line {
  background: #999;
  width: 1px;
  height: 3px;
  position: absolute;
  left: 50%;
}

/* the text label postion & size */
/* it overflows so no need for width to be accurate */
.ui-slider-pips .ui-slider-label {
  position: absolute;
  top: 5px;
  left: 50%;
  margin-left: -1em;
  width: 2em;
}

/* make it easy to see when we hover a label */
.ui-slider-pips:not(.ui-slider-disabled) .ui-slider-pip:hover .ui-slider-label {
  color: black;
  font-weight: bold;
}

/* VERTICAL */
/* vertical slider needs right-margin, not bottom */
.ui-slider-vertical.ui-slider-pips {
  margin-bottom: 1em;
  margin-right: 2em;
}

/* align vertical pips left and to right of the slider */
.ui-slider-vertical.ui-slider-pips .ui-slider-pip {
  text-align: left;
  top: auto;
  left: 20px;
  margin-left: 0;
  margin-bottom: -0.5em;
}

/* vertical line/pip should be horizontal instead */
.ui-slider-vertical.ui-slider-pips .ui-slider-line {
  width: 3px;
  height: 1px;
  position: absolute;
  top: 50%;
  left: 0;
}

.ui-slider-vertical.ui-slider-pips .ui-slider-label {
  top: 50%;
  left: 0.5em;
  margin-left: 0;
  margin-top: -0.5em;
  width: 2em;
}

/* FLOATING HORIZTONAL TOOLTIPS */
/* remove the godawful looking focus outline on handle and float */
.ui-slider-float .ui-slider-handle:focus,
.ui-slider-float .ui-slider-handle.ui-state-focus .ui-slider-tip-label,
.ui-slider-float .ui-slider-handle:focus .ui-slider-tip,
.ui-slider-float .ui-slider-handle.ui-state-focus .ui-slider-tip-label,
.ui-slider-float .ui-slider-handle:focus .ui-slider-tip-label
.ui-slider-float .ui-slider-handle.ui-state-focus .ui-slider-tip-label {
  outline: none;
}

/* style tooltips on handles and on labels */
/* also has a nice transition */
.ui-slider-float .ui-slider-tip,
.ui-slider-float .ui-slider-tip-label {
  position: absolute;
  visibility: hidden;
  top: -40px;
  display: block;
  width: 34px;
  margin-left: -18px;
  left: 50%;
  height: 20px;
  line-height: 20px;
  background: white;
  border-radius: 3px;
  border: 1px solid #888;
  text-align: center;
  font-size: 12px;
  opacity: 0;
  color: #333;
  -webkit-transition-property: opacity, top, visibility;
  transition-property: opacity, top, visibility;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  -webkit-transition-duration: 200ms, 200ms, 0ms;
  transition-duration: 200ms, 200ms, 0ms;
  -webkit-transition-delay: 0ms, 0ms, 200ms;
  transition-delay: 0ms, 0ms, 200ms;
}

/* show the tooltip on hover or focus */
/* also switch transition delay around */
.ui-slider-float .ui-slider-handle:hover .ui-slider-tip,
.ui-slider-float .ui-slider-handle.ui-state-hover .ui-slider-tip,
.ui-slider-float .ui-slider-handle:focus .ui-slider-tip,
.ui-slider-float .ui-slider-handle.ui-state-focus .ui-slider-tip,
.ui-slider-float .ui-slider-handle.ui-state-active .ui-slider-tip,
.ui-slider-float .ui-slider-pip:hover .ui-slider-tip-label {
  opacity: 1;
  top: -30px;
  visibility: visible;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  -webkit-transition-delay: 200ms, 200ms, 0ms;
  transition-delay: 200ms, 200ms, 0ms;
}

/* put label tooltips below slider */
.ui-slider-float .ui-slider-pip .ui-slider-tip-label {
  top: 42px;
}

.ui-slider-float .ui-slider-pip:hover .ui-slider-tip-label {
  top: 32px;
  font-weight: normal;
}

/* give the tooltip a css triangle arrow */
.ui-slider-float .ui-slider-tip:after,
.ui-slider-float .ui-slider-pip .ui-slider-tip-label:after {
  content: " ";
  width: 0;
  height: 0;
  border: 5px solid rgba(255, 255, 255, 0);
  border-top-color: white;
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -5px;
}

/* put a 1px border on the tooltip arrow to match tooltip border */
.ui-slider-float .ui-slider-tip:before,
.ui-slider-float .ui-slider-pip .ui-slider-tip-label:before {
  content: " ";
  width: 0;
  height: 0;
  border: 5px solid rgba(255, 255, 255, 0);
  border-top-color: #888;
  position: absolute;
  bottom: -11px;
  left: 50%;
  margin-left: -5px;
}

/* switch the arrow to top on labels */
.ui-slider-float .ui-slider-pip .ui-slider-tip-label:after {
  border: 5px solid rgba(255, 255, 255, 0);
  border-bottom-color: white;
  top: -10px;
}

.ui-slider-float .ui-slider-pip .ui-slider-tip-label:before {
  border: 5px solid rgba(255, 255, 255, 0);
  border-bottom-color: #888;
  top: -11px;
}

/* FLOATING VERTICAL TOOLTIPS */
/* tooltip floats to left of handle */
.ui-slider-vertical.ui-slider-float .ui-slider-tip,
.ui-slider-vertical.ui-slider-float .ui-slider-tip-label {
  top: 50%;
  margin-top: -11px;
  width: 34px;
  margin-left: 0px;
  left: -60px;
  color: #333;
  -webkit-transition-duration: 200ms, 200ms, 0;
  transition-duration: 200ms, 200ms, 0;
  -webkit-transition-property: opacity, left, visibility;
  transition-property: opacity, left, visibility;
  -webkit-transition-delay: 0, 0, 200ms;
  transition-delay: 0, 0, 200ms;
}

.ui-slider-vertical.ui-slider-float .ui-slider-handle:hover .ui-slider-tip,
.ui-slider-vertical.ui-slider-float .ui-slider-handle.ui-state-hover .ui-slider-tip,
.ui-slider-vertical.ui-slider-float .ui-slider-handle:focus .ui-slider-tip,
.ui-slider-vertical.ui-slider-float .ui-slider-handle.ui-state-focus .ui-slider-tip,
.ui-slider-vertical.ui-slider-float .ui-slider-handle.ui-state-active .ui-slider-tip,
.ui-slider-vertical.ui-slider-float .ui-slider-pip:hover .ui-slider-tip-label {
  top: 50%;
  margin-top: -11px;
  left: -50px;
}

/* put label tooltips to right of slider */
.ui-slider-vertical.ui-slider-float .ui-slider-pip .ui-slider-tip-label {
  left: 47px;
}

.ui-slider-vertical.ui-slider-float .ui-slider-pip:hover .ui-slider-tip-label {
  left: 37px;
}

/* give the tooltip a css triangle arrow */
.ui-slider-vertical.ui-slider-float .ui-slider-tip:after,
.ui-slider-vertical.ui-slider-float .ui-slider-pip .ui-slider-tip-label:after {
  border: 5px solid rgba(255, 255, 255, 0);
  border-left-color: white;
  border-top-color: transparent;
  position: absolute;
  bottom: 50%;
  margin-bottom: -5px;
  right: -10px;
  margin-left: 0;
  top: auto;
  left: auto;
}

.ui-slider-vertical.ui-slider-float .ui-slider-tip:before,
.ui-slider-vertical.ui-slider-float .ui-slider-pip .ui-slider-tip-label:before {
  border: 5px solid rgba(255, 255, 255, 0);
  border-left-color: #888;
  border-top-color: transparent;
  position: absolute;
  bottom: 50%;
  margin-bottom: -5px;
  right: -11px;
  margin-left: 0;
  top: auto;
  left: auto;
}

.ui-slider-vertical.ui-slider-float .ui-slider-pip .ui-slider-tip-label:after {
  border: 5px solid rgba(255, 255, 255, 0);
  border-right-color: white;
  right: auto;
  left: -10px;
}

.ui-slider-vertical.ui-slider-float .ui-slider-pip .ui-slider-tip-label:before {
  border: 5px solid rgba(255, 255, 255, 0);
  border-right-color: #888;
  right: auto;
  left: -11px;
}

/* SELECTED STATES */
/* Comment out this chuck of code if you don't want to have
        the new label colours shown */
.ui-slider-pips [class*=ui-slider-pip-initial] {
  font-weight: bold;
  color: #14CA82;
}

.ui-slider-pips .ui-slider-pip-initial-2 {
  color: #1897C9;
}

.ui-slider-pips [class*=ui-slider-pip-selected] {
  font-weight: bold;
  color: #FF7A00;
}

.ui-slider-pips .ui-slider-pip-inrange {
  color: black;
}

.ui-slider-pips .ui-slider-pip-selected-2 {
  color: #E70081;
}

.ui-slider-pips [class*=ui-slider-pip-selected] .ui-slider-line,
.ui-slider-pips .ui-slider-pip-inrange .ui-slider-line {
  background: black;
}
