var array = [
  // {
  //   banco: 'Banco do Brasil',
  //   numero: '112233',
  //   nome: 'Amanda',
  //   cpfCnpj: '154818484',
  //   agencia: '0310',
  //   conta: '1568748',
  //   valor: 10.000,
  //   data: '01/01/2000',
  // },
  // {
  //   banco: 'Banco do Brasil',
  //   numero: '112233',
  //   nome: 'Amanda',
  //   cpfCnpj: '154818484',
  //   agencia: '0310',
  //   conta: '1568748',
  //   valor: 10.000,
  //   data: '01/01/2000',
  // },
  // {
  //   banco: 'Banco do Brasil',
  //   numero: '112233',
  //   nome: 'Amanda',
  //   cpfCnpj: '154818484',
  //   agencia: '0310',
  //   conta: '1568748',
  //   valor: 10.000,
  //   data: '01/01/2000',
  // }
]


function cpfValidador(strCPF) {
  strCPF = strCPF.replace(/\D/g, "");

  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

function carregarTabela() {
  var info = ''
  array.forEach((x) => {
    info += '<tr>';
    info += '<td>' + x.banco + '</td>'
    info += '<td>' + x.numero + '</td>'
    info += '<td>' + x.nome + '</td>'
    info += '<td>' + x.cpfCnpj + '</td>'
    info += '<td>' + x.agencia + '</td>'
    info += '<td>' + x.conta + '</td>'
    info += '<td>' + x.valor + '</td>'
    info += '<td>' + x.data + '</td>'
    info += '</tr>'
  })

  $("#table").html(info);
}

//Jquery Validate
$("document").ready(
  $("#form-cadastro").validate({
    rules: {
      nome: {
        required: true,
        minlength: 2,
      },
      cpf: {
        required: true,
        cpfValidador: true,
      },
      rg: {
        required: true,
      },
      datanascimento: {
        required: true,
      },
      estadocivil: {
        required: true,
      },
      sexo: {
        required: true,
      },
      endereco: {
        required: true,
      },
      numero: {
        required: true,
      },
      cep: {
        required: true,
      },
      estado: {
        required: true,
      },
      cidade: {
        required: true,
      },
      email: {
        required: true,
      },
      celular: {
        required: true,
      },
      telefone: {
        required: true,
      },
    },
    messages: {
      nome: {
        minlength: "Este campo deve ter no minimo 2 caracteres.",
      },
      cpf: {
        required: "Este campo é obrigatório",
        cpfValidador: "CPF invalido.",
      },
    },
    errorElement: "span",
    errorClass: "invalid-feedback",
    highlight: function (element) {
      //$(element).prev().addClass("text-danger");
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element) {
      //$(element).prev().removeClass("text-danger");
      $(element).addClass("is-valid").removeClass("is-invalid");
    },
  }),

  jQuery.validator.addMethod(
    "cpfValidador",
    function (value, element) {
      return cpfValidador(value);
    },
    "CPF invalido."
  ),

  carregarTabela()
);

function caixaAltaNome() {
  document.getElementById("inputNome").value = document
    .getElementById("inputNome")
    .value.toUpperCase();
}
function caixaAltaEndereco() {
  document.getElementById("inputEndereco").value = document
    .getElementById("inputEndereco")
    .value.toUpperCase();
}
function caixaAltaCidade() {
  document.getElementById("inputCidade").value = document
    .getElementById("inputCidade")
    .value.toUpperCase();
}
function caixaAltaProduto() {
  document.getElementById("inputNomeProduto").value = document
    .getElementById("inputNomeProduto")
    .value.toUpperCase();
}
function formatarPreco() {
  // Para pegar o objeto que chamou o evento 
  var v = (event.target.value).substring(3); //extrai os 3 primeiros caracteres relativos ao 'R$ '
  //var v = event.target.value;// faz a ssociação com o elemento HTML que chamou a função num determinado evento

  //var v = document.getElementById('ivalor').value; -> se fosse aplicada à apenas 1 elemento, no caso o input ivalor, essa função só poderia ser usada nele

  //Faz uma série de substituições nas Expressões Regulares que podem gerar valores monetários
  v = v.replace(/\D/g, "");
  v = v.replace(/^0+/g, "");
  v = v.replace(/(\d{1})(\d{14})$/, "$1.$2");
  v = v.replace(/(\d{1})(\d{11})$/, "$1.$2");
  v = v.replace(/(\d{1})(\d{8})$/, "$1.$2");
  v = v.replace(/(\d{1})(\d{5})$/, "$1.$2");
  v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2");
  // Para retornar os valores que estão sendo digitados com a formatação ao elemento que chamou a função
  event.target.value = "R$ " + v;
  //event.target.value = v;
}

function mascaraCpf() {
  var cpf = event.target.value;
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  event.target.value = cpf;
}

function mascaraCNPJ() {
  var cnpj = event.target.value;
  cnpj = cnpj.replace(/\D/g, '');
  cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d{2})/, '$1-$2');
  event.target.value = cnpj;
}

function Rg() {
  var cpf = event.target.value;
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{2})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  event.target.value = cpf;
}
function Tel() {
  var tel = event.target.value;
  tel = tel.replace(/\D/g, "");
  tel = tel.replace(/^(\d)/, "($1");
  tel = tel.replace(/(.{3})(\d)/, "$1)$2");
  if (tel.length == 9) {
    tel = tel.replace(/(.{1})$/, "-$1");
  } else if (tel.length == 10) {
    tel = tel.replace(/(.{2})$/, "-$1");
  } else if (tel.length == 11) {
    tel = tel.replace(/(.{3})$/, "-$1");
  } else if (tel.length == 12) {
    tel = tel.replace(/(.{4})$/, "-$1");
  } else if (tel.length > 12) {
    tel = tel.replace(/(.{4})$/, "-$1");
  }
  event.target.value = tel;
}

function phoneMask(event) {
  var input = event.target;
  var phone = event.target.value;
  var length = phone.length;

  phone = phone.replace(/(\D)/g, "");

  if (length >= 11)
    phone = phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4");
  if (length >= 8)
    phone = phone.replace(/^(\d{2})(\d{1})(\d{4})/, "($1) $2 $3-");
  if (length >= 4) phone = phone.replace(/^(\d{2})(\d{1})/, "($1) $2 ");
  if (length >= 3) phone = phone.replace(/^(\d{2})/, "($1) ");

  input.value = phone;
}

function resetForm() {
  $("#form-cadastro").trigger("reset");
  $("#form-cadastro .form-control").removeClass("is-valid");
  $("#form-cadastro .form-select").removeClass("is-valid");
  $("#form-cadastro .form-control").removeClass("is-invalid");
  $("#form-cadastro .form-select").removeClass("is-invalid");
}

function onSubmit() {
  if ($("#form-cadastro").valid()) {
    var obj = {
      banco: $("#banco").val(),
      numero: $("#inputAgencia").val(),
      nome: $("#inputConta").val(),
      cpfCnpj: $("#inputNumero").val(),
      agencia: $("#inputNome").val(),
      conta: $("#inputCpfCnpj").val(),
      valor: $("#inputValor").val(),
      data: $("#inputDate").val(),
    }

    array.push(obj);
    // $.ajax({
    //   url: 'https://localhost:7259/api/Cheques',
    //   type:"POST",
    //   data: obj,
    //   contentType:"application/json; charset=utf-8",
    //   dataType:"json",
    //   success: function(data) {
    //     console.log(data);
    //   },
    // });

    
    resetForm();
    carregarTabela();

    alert("Cadastro com sucesso!");
  }
}

function tipoPessoa() {
  //pegar valor utilizar $("#inputCpfCnpj").val();
  //inserir valor
  $("#inputCpfCnpj").val('');
  if (event.target.value == 1) {
    $("#inputCpfCnpj").attr('maxlength', '14');
    $("#inputCpfCnpj").attr('onkeypress', "mascaraCpf()");
  }

  if (event.target.value == 2) {
    $("#inputCpfCnpj").attr('maxlength', '18');
    $("#inputCpfCnpj").attr('onkeypress', "mascaraCNPJ()");
  }
}


