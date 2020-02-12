let mydata =document.getElementById("accounts1").value;
    let result = mydata.split(",");
      result.forEach((element) => {
          $('#AccountList').append(`<option value="${element}">"${element}"</option>`)  
      });

$(document).ready(function() {
    $("select.Accounts").change(function(){
        let selectedAccount = $(this).children("option:selected").val();
        document.getElementById("selecytedAccount").value=selectedAccount;
    });
    $("select.Accounts1").change(function(){
        let selectedCandidate = $(this).children("option:selected").val();
        document.getElementById("selecytedCandiadte").value=selectedCandidate;
    });
});


$('#vote').click(function(event){
    let account = document.getElementById("selecytedAccount").value;
    let id = document.getElementById("selecytedCandiadte").value;
    if(id != ""){
        let data = {
            'account':account,
            'id':id
        }
        console.log(`accounts:= ${account} id := ${id}`);
        $.ajax({
            url: '/vote',
            type: 'POST',
            data: data,
            success: function (data) {
                alert(data.message);
                console.log("sdfsad",data.message)
                location.reload();
                // showSuccess(data.message)
                //window.location.href = data.url;
            },
            error: function (data) {
                console.log('In error of forgotPassword ==>', data);
               alert(data.message);
            }
        });
  }else{
    alert("Please enter candidate ID");
  }
})

/*

instance.methods.candidatesCount().call(function(err,res){
  if(res){
  res=parseInt(res)+1;
      for(i=1;i<res;i++)
      {
        instance.methods.candidates(i).call(function(err,result){
          if(result){
            $('#AccountList1').append(`<option value=${result.id}>${result.name}</option>`);
          }else{
              console.log("error",err);
          }
      });
      }
  }else{
    console.log(err);
  }
});
*/