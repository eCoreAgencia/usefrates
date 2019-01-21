class Contato {
    constructor() {
        if($('body').hasClass('contato')) {
            this.send();
        }
    }

    send() {
        $('.institutional__text #sendEmail').on('click', function() {
            event.preventDefault();

            var name     = $('.institutional__text .item #name').val();
            var email    = $('.institutional__text .item #email').val();
            var assunto  = $('.institutional__text .item #assunto').val();
            var text     = $('.institutional__text .item #text').val();

            var data =  {'name' : name, 'email' : email, 'assunto' : assunto, 'mensager' : text}

            $.ajax({
                "async": true,
                "url": "//api.vtexcrm.com.br/usefrates/dataentities/CT/documents/",
                "type": "PATCH",
                "contentType": "application/json",
                "data": JSON.stringify(data),
                success : function () {                    
                    $('.institutional__text').append('<p class="succesMsg">Mensagem enviada com sucesso !!</p>');
                    setTimeout(() => {
                        $('.succesMsg').remove();
                    }, 5000);
                },
                error : function() {
                    $('.institutional__text').append('<p class="erroMsg">Ops, algo de errado aconteceu !!</p>');
                    setTimeout(() => {
                        $('.erroMsg').remove();
                    }, 5000);
                }
            });
        });
    }
}

window.Contato = new Contato();