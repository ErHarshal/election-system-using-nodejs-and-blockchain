$(document).ready(()=>{
    $('#addNumber').on('click',()=>{
        var num1=document.getElementById('number1').value;
        var num2=document.getElementById('number2').value;
        var sum=parseInt(num1)+parseInt(num2);
        document.getElementById('sum').value=sum;
    });
});