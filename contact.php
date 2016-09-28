<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Contact form - theTopfer</title>
        <link rel="stylesheet" href="main.css"> 
        <link rel="icon" type="image/vnd.microsoft.icon" href="favicon.ico" />
        <link rel="icon" type="image/png" href="logo-black_T.png" />
    </head>
    <body>
        <?php
        $result = 'Unknown error. Please try again.';
        $resultColor = "red";

        if (isset($_POST['submit']) && !empty($_POST['submit']) &&
            isset($_POST['name']) && !empty($_POST['name']) &&
            isset($_POST['subject']) && !empty($_POST['subject']) &&
            isset($_POST['email']) && !empty($_POST['email']) &&
            isset($_POST['message']) && !empty($_POST['message']))
        {
            // form data and test user input
            $subject = test_input($_POST['subject']);
            $name = test_input($_POST['name']);
            $email = test_input($_POST['email']);
            $email = filter_var($email, FILTER_SANITIZE_EMAIL);
            $message = test_input($_POST['message']);

            if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
                if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
                    // parse config
                    $config = parse_ini_file("config.ini");

                    //get verify response data
                    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $config["secret"] . '&response=' . $_POST['g-recaptcha-response']);
                    $responseData = json_decode($verifyResponse);

                    if ($responseData->success) {
                        // send email
                        $to = $config["targetEmail"];
                        $htmlContent = "
                    <h1>Contact request details</h1>
                    <p><b>Name: </b>" . $name . "</p>
                    <p><b>Email: </b>" . $email . "</p>
                    <p><b>Subject: </b>" . $subject . "</p>
                    <p><b>Message: </b>" . $message . "</p>";
                        // Always set content-type when sending HTML email
                        $headers = "MIME-Version: 1.0" . "\r\n";
                        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                        // More headers
                        $headers .= 'From:'.$name.' <'.$email.'>' . "\r\n";

                        //send email
                        if (mail($to, $subject, $htmlContent, $headers)) {
                            $result = "Your message has been submitted successfully.";
                            $resultColor = "green";
                        }
                        else {
                            $result = "Error sending message! Please check your input and try again";
                            $resultColor = "red";
                        }
                    }
                    else {
                        $result = 'Robot verification failed, please try again.';
                        $resultColor = "red";
                    }
                }
                else {
                    $result = 'Please click on the reCAPTCHA box.';
                    $resultColor = "red";
                }
            } 
            else {
                $result = "Invalid email address";
                $resultColor = "red";
            }
        }
        else {
            $result = "All fields are required";
            $resultColor = "red";
        }

        echo("<div id=\"contactResult\" style='background: " . $resultColor . "'>" . $result . "</div>");

        function test_input($data)
        {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }
        ?>
        <div style="display: none">
            <endora></endora>
        </div>
    </body>
</html>
