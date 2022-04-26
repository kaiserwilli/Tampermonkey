// ==UserScript==
// @name         MBG Interview Functions
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  Add Functionality to MBG
// @updateurl    https://raw.githubusercontent.com/kaiserwilli/Tampermonkey/main/MBGInterviewFunctions.js
// @author       You
// @match        https://siaesolutions.com/ezMandate/mbg.action
// @icon         https://www.google.com/s2/favicons?sz=64&domain=siaesolutions.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

function SetAllQuestionStatusToYes() {
    var QuestionStatusElement = document.getElementsByClassName('questionStatus');
    for (var i = 0; i < QuestionStatusElement.length; i++) {
        SetQuestionStatusToIndex(QuestionStatusElement[i], 1);
    }
}

function SetTrainingName() {
    var InterviewContactFields = document.getElementsByClassName('interviewContactField');
    var SelectedName = InterviewContactFields[0].value;
    var TrainingFieldNumber = InterviewContactFields.length - 2;
    InterviewContactFields[TrainingFieldNumber].value = SelectedName;
}

function SetAllQuestionsStatusToNotStarted() {
    var QuestionStatusElement = document.getElementsByClassName('questionStatus');
    for (var i = 0; i < QuestionStatusElement.length; i++) {
        SetQuestionStatusToIndex(QuestionStatusElement[i], 0);
    }
    onDeleteInterview(-1, false);
}

function SetQuestionStatusToIndex(QuestionStatusElement, Index)	 {
    QuestionStatusElement.selectedIndex = Index;
    onQuestionStatus(QuestionStatusElement);
}

function getInputElementByNumber(number)	 {
    return document.querySelectorAll('[name^="input"]')[number];
}

function CustomizeAnswersForMandate() {
    console.log("CustomizeAnswersForMandate run");
    SetAllQuestionStatusToYes();
    SetTrainingName();
    var MandateName = document.getElementsByTagName('H2')[0].innerHTML;
    switch (MandateName) {
        case 'Child Abuse and Neglect Reporting ':
            FilloutSuperintendentsOffice(getInputElementByNumber(0), getInputElementByNumber(1));
            break;
        case 'Comprehensive School Safety Plan':
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[7], 3);
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[11], 3);
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[12], 3);
            FilloutSuperintendentsOffice(getInputElementByNumber(3), getInputElementByNumber(4));
            break;
        case 'Intradistrict Attendance':
            FilloutSuperintendentsOffice(getInputElementByNumber(3), getInputElementByNumber(4));
            break;
        case 'Juvenile Court Notices II':
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[2], 3);
            break;
        case 'Parental Involvement Programs':
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[3], 3);
            FilloutSuperintendentsOffice(getInputElementByNumber(0), getInputElementByNumber(1));
            break;
        case 'Pupil Promotion and Retention':
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[0], 3);
            FilloutSuperintendentsOffice(getInputElementByNumber(0), getInputElementByNumber(1));
            break;
        case 'Pupil Safety Notices':
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[3], 0);
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[4], 3);
            FilloutSuperintendentsOffice(getInputElementByNumber(6), getInputElementByNumber(7));
            break;
        case 'School Accountability Report Cards':
            getInputElementByNumber(0).value = "2021-2022";
            SetQuestionStatusToIndex(document.getElementsByClassName('questionStatus')[10], 4);
            FilloutSuperintendentsOffice(getInputElementByNumber(1), getInputElementByNumber(2));
            break;
        case 'Student Records ':
            FilloutSuperintendentsOffice(getInputElementByNumber(0), getInputElementByNumber(1));
            break;
        case 'The Stull Act':
            getInputElementByNumber(0).value = 'District Site -- Personnel Services';
            FilloutSuperintendentsOffice(getInputElementByNumber(3), getInputElementByNumber(4));
            break;
        case 'Williams Case Implementation I, II, and III (Site Based Activities)':
            getInputElementByNumber(0).value = 'District Site -- Other';
            break;


        default:
            console.log(MandateName);
    }
}

function FilloutSuperintendentsOffice(DocumentationDropdownElement, ContactElement) {
    DocumentationDropdownElement.value = 'Posted on the District website';


    for (var i = 0; i < ContactElement.options.length; i++) {
        if (ContactElement.options[i].text.substring(0, 5) == 'Super')	 {
            ContactElement.selectedIndex = i;
            break;
        }
    }
}

//create the buttons
var InsertElement = document.getElementById('footer');
InsertElement.style.height = '4em';
var innerHtml = InsertElement.innerHTML;
var buttonhtml = '<span style="display:  table;margin: 0 auto;"> <button onclick="CustomizeAnswersForMandateTampermonkeyHelper()">Prefill Answers</button><button onclick="SetAllQuestionStatusToYesHelper()">All Yes</button><button onclick="SetTrainingNameHelper()">Set Training</button><button onclick="SetAllQuestionsStatusToNotStartedHelper()">Clear All</button></span>';
innerHtml = buttonhtml + innerHtml;
InsertElement.innerHTML = innerHtml;

//define button helpers that allow tampermonkey to run these functions indirectly
window.CustomizeAnswersForMandateTampermonkeyHelper = CustomizeAnswersForMandate;
window.SetAllQuestionStatusToYesHelper = SetAllQuestionStatusToYes;
window.SetTrainingNameHelper = SetTrainingName;
window.SetAllQuestionsStatusToNotStartedHelper = SetAllQuestionsStatusToNotStarted;
}
)();
