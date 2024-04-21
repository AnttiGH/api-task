"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const displayResult = () => __awaiter(void 0, void 0, void 0, function* () {
    const calculatingPrime = document.getElementById("prime").checked;
    const calculatingSumAndPrime = document.getElementById("sumAndPrime").checked;
    const textInputValue = document.querySelector(".container .number-input-field").value;
    let response;
    if (calculatingPrime && textInputValue) {
        response = yield fetch("/myapi/checkprime?number=" + textInputValue);
    }
    else if (calculatingSumAndPrime && textInputValue) {
        response = yield fetch("/myapi/sum?numbers=" + textInputValue);
    }
    else {
        document.querySelector(".result").innerText = JSON.stringify("Virhe syötteessä");
        return;
    }
    if (response.status === 200) {
        const result = yield response.json();
        document.querySelector(".result").innerText = JSON.stringify(result);
    }
    else {
        document.querySelector(".result").innerText = JSON.stringify("Virhe syötteessä");
    }
});
