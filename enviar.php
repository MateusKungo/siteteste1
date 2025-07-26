<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $assunto = strip_tags(trim($_POST["assunto"]));
    $mensagem = trim($_POST["mensagem"]);

    $para = "geral@ncsistemas.it.ao";
    $assunto_email = "Formulário de Contato: $assunto";

    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Assunto: $assunto\n\n";
    $corpo .= "Mensagem:\n$mensagem\n";

    $headers = "From: $nome <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "MIME-Version: 1.0\r\n";

    $enviado = mail($para, $assunto_email, $corpo, $headers);
    ?>

    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $enviado ? 'Mensagem Enviada' : 'Erro no Envio'; ?> | NCSistemas</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
        <style>
            body {
                background-color: #f8f9fa;
                font-family: 'Segoe UI', sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }

            .message-box {
                background: #ffffff;
                color: #333;
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
                text-align: center;
                max-width: 480px;
                width: 90%;
                animation: fadeIn 0.5s ease-in-out;
            }

            .message-box i {
                font-size: 58px;
                margin-bottom: 20px;
            }

            .btn-custom {
                background-color: #26D48C;
                color: #fff;
                border-radius: 50px;
                padding: 12px 30px;
                font-weight: 600;
                margin-top: 20px;
                text-decoration: none;
                display: inline-block;
                transition: 0.3s ease-in-out;
            }

            .btn-custom:hover {
                background-color: #41CC92FF;
                text-decoration: none;
            }

            @keyframes fadeIn {
                from {opacity: 0; transform: translateY(20px);}
                to {opacity: 1; transform: translateY(0);}
            }
        </style>
    </head>
    <body>

    <div class="message-box">
        <?php if ($enviado): ?>
            <i class="fas fa-check-circle text-success"></i>
            <h3 class="mb-3">Mensagem enviada com sucesso!</h3>
            <p>Obrigado, <strong><?php echo htmlspecialchars($nome); ?></strong>. A sua mensagem foi enviada para a equipe da <strong>NCSistemas</strong>.</p>
        <?php else: ?>
            <i class="fas fa-times-circle text-danger"></i>
            <h3 class="mb-3">Erro ao enviar mensagem</h3>
            <p>Ocorreu um problema. Por favor, tente novamente ou envie diretamente para <strong>geral@ncsistemas.it.ao</strong>.</p>
        <?php endif; ?>
        <a href="https://ncsistemas.it.ao/" class="btn btn-custom">Voltar</a>
    </div>

    </body>
    </html>

    <?php
} else {
    echo "Acesso inválido.";
}
?>
