
const displayResult = async () => { 
    const isPrimeRadioBtnChecked = (document.getElementById("prime") as HTMLInputElement).checked;
    const isSumAndPrimeRadioBtnChecked = (document.getElementById("sumAndPrime") as HTMLInputElement).checked;
    const textInputValue = (document.querySelector(".container .number-input-field") as HTMLInputElement).value
    
    let response;
    if (isPrimeRadioBtnChecked && textInputValue){
        response = await fetch("/myapi/checkprime?number=" + textInputValue);
    } else if(isSumAndPrimeRadioBtnChecked && textInputValue){
        response = await fetch("/myapi/sum?numbers=" + textInputValue);
    }else{
        (document.querySelector(".result") as HTMLElement).innerText = JSON.stringify("Virhe syötteessä");
        return;
    }
    if (response.status === 200){
        const result = await response.json();
        (document.querySelector(".result") as HTMLElement).innerText = JSON.stringify(result);
    }else{
        (document.querySelector(".result") as HTMLElement).innerText=JSON.stringify("Virhe syötteessä");
    }
};

