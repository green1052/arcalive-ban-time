// ==UserScript==
// @name arcalive-ban-time
// @version 1.0.0
// @author green1052
// @description 아카라이브 남은 차단 일을 표시합니다.
// @match https://arca.live/b/*/*
// @namespace arcalive-ban-time
// @rut-at document-end
// @noframes
// @license GPLv3
// @downloadURL https://raw.githubusercontent.com/green1052/arcalive-ban-time/master/arcalive-ban-time.user.js
// @homepageURL https://github.com/green1052/arcalive-ban-time
// ==/UserScript==

(() => {
    "use strict";

    /**
     * @param {string} time
     */
    const calculateLeftTime = (time) => {
        const diff = new Date(time).getTime() - new Date().getTime();
        const day = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hour = Math.floor(diff / (1000 * 60 * 60));

        const span = document.createElement("span");
        span.innerText = " [";

        if (day > 0) {
            span.innerText += `${day}일`;
        } else if (hour > 0) {
            span.innerText += `${hour}시간`;
        }

        span.innerText += " 남음]";

        return span;
    };


    if (location.href.includes("/blocked")) {
        for (const element of document.querySelectorAll(".extendableDatetime:nth-child(2) > time:nth-child(1)")) {
            const time = element.getAttribute("datetime");
            if (!time) continue;

            const left = calculateLeftTime(time);

            console.log(element);
            element.parentElement.appendChild(left);
        }

        return;
    }

    for (const element of document.querySelectorAll(".user-block > time")) {
        const time = element.getAttribute("datetime");
        if (!time) continue;

        const left = calculateLeftTime(time);

        element.parentElement.insertBefore(left, element.nextSibling);
    }
})();
