// ==UserScript==
// @name         iPasas.lt AutoFiller
// @namespace    https://github.com/aurimasniekis
// @homepageURL  https://github.com/aurimasniekis/ipasaslt_autofiller
// @supportURL   https://github.com/aurimasniekis/ipasaslt_autofiller/issues
// @updateURL    https://raw.githubusercontent.com/aurimasniekis/ipasaslt_autofiller/master/index.user.js
// @downloadURL  https://raw.githubusercontent.com/aurimasniekis/ipasaslt_autofiller/master/index.user.js
// @version      1.0.0
// @license      MIT
// @run-at       document-idle
// @description  Automatically fills your data into website, no more typing same numbers again
// @author       Aurimas Niekis
// @match        https://www.ipasas.lt/*
// @icon         https://www.google.com/s2/favicons?domain=ipasas.lt
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

const configId = 'iPassAutoFillerConfig';
const windowcss = `
    #${configId} {
        background-color: darkslategray;
        color: whitesmoke;
    }
    #${configId} a,
    #${configId} button,
    #${configId} input,
    #${configId} select,
    #${configId} select option,
    #${configId} .section_desc {
        color: whitesmoke !important;
    }
    #${configId} a,
    #${configId} button,
    #${configId} input,
    #${configId} .section_desc {
        font-size: .8em !important;
    }
    #${configId} button,
    #${configId} input,
    #${configId} select,
    #${configId} select option,
    #${configId} .section_desc {
        background-color: #333;
        border: 1px solid #222;
    }
    #${configId} button{
        height: 1.65em !important;
    }
    #${configId}_header {
        font-size: 1.3em !important;
    }
    #${configId}.section_header {
        background-color: #454545;
        border: 1px solid #222;
        font-size: 1em !important;
    }
    #${configId} .field_label {
        font-size: .7em !important;
    }
    #${configId}_buttons_holder {
        position: fixed;
        width: 97%;
        bottom: 0;
    }
    #${configId} .reset_holder {
        float: left;
        position: relative;
        bottom: -1em;
    }
    #${configId} .saveclose_buttons {
        margin: .7em;
    }
    #${configId}_field_support {
        background: none !important;
        border: none !important;
        cursor: pointer !important;
        padding: 0 !important;
        text-decoration: underline !important;
    }
    #${configId}_field_support:hover,
    #${configId}_resetLink:hover {
        filter: drop-shadow(0 0 1px dodgerblue);
    }
`;
const iframecss = `
    height: 15em;
    width: 30em;
    border: 1px solid;
    border-radius: 3px;
    position: fixed;
    z-index: 999;
`;

GM_registerMenuCommand(`${GM_info.script.name} Settings`, () => {
	GM_config.open();
    GM_config.frame.style = iframecss;
});

GM_config.init({
    id: `${configId}`,
    title: `${GM_info.script.name} ${GM_info.script.version}`,
    fields: {
        asmCode: {
            section: ['', 'Settings'],
            label: 'Asmens Kodas',
            labelPos: 'top',
            type: 'text',
            default: '',
        },
        telNr: {
            label: 'Telefono Numeris',
            labelPos: 'top',
            type: 'text',
            default: '+3706',
        },
    },
    css: windowcss,
    events: {
        save: function() {
            GM_config.close();
        }
    },
});


(function() {
    'use strict';

    const asmNrField = document.querySelector("#asm_kodas");
    const telNrField = document.querySelector("#tel_nr");
    const asmNrValue = GM_config.get('asmCode');
    const telNrValue = GM_config.get('telNr');

    if (asmNrField && asmNrValue !== '') {
        asmNrField.value = asmNrValue;
    }


    if (telNrField && telNrValue !== '+3706') {
        telNrField.value = telNrValue;
    }
})();
