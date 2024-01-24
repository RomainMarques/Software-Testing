// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/8) : When we go into update address, changed nothing, and submit, the second field of address is changed.
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

// SAME AS ISSUE 2, WILL BE DELETED LATER