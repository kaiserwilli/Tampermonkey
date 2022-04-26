// ==UserScript==
// @name         Replicon ReSort Districts
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  Correct alphabetic sorting for district list to allow keyboard selection
// @updateURL    https://raw.githubusercontent.com/kaiserwilli/Tampermonkey/main/RepliconReSortDistricts.js
// @downloadURL  https://raw.githubusercontent.com/kaiserwilli/Tampermonkey/main/RepliconReSortDistricts.js
// @author       You
// @match        https://na5.replicon.com/SchoolInnovationsAchievement/my/timesheet/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=replicon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Replicon.UI.Components.DropDownController.prototype.receiveRequestedOptions = function(sender, options)
{
     //start of added code. The rest of the code is native to replicon
	options = options.sort((a,b) => a.value.localeCompare(b.value));
    this.options = options;
    //end of added code

    for (var i = 0; i < options.length; i++) {
        if (options[i].value == this.value) {
            this.hoverOptionIndex = i;
            break;
        }
    }

    var args = new Replicon.UI.Components.DropDownController.statics.receiveRequestedOptionsArgs(this, this.context, options, this.relativeNodeId);
    this.receiveRequestedOptionsEvent.raise(sender, args);

    // Was a search string triggered?
    var searchString = this.getPostReceiveSearchString();
    if (searchString.length > 0)
    {
        this.searchForOption(sender, this.context, searchString);
        this.setPostReceiveSearchString('');
    }
}
})();
