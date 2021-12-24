<?php
require_once __DIR__ . '/../vendor/autoload.php';

$json = file_get_contents('php://input');
$data = json_decode($json);

$firstName = htmlspecialchars($data->firstName);
$lastName = htmlspecialchars($data->lastName);
$email = htmlspecialchars($data->email);

$logoMM = base64_encode(file_get_contents("../assets/images/manhattanmannor-logo.png"));
$logoRosie = base64_encode(file_get_contents("../assets/images/rosie-logo.png"));

# Save user information to CSV
$content = $firstName . "," . $lastName . "," . $email . "\r";
$file = "../registeredUsers.csv";
if (is_file($file)) {
    file_put_contents($file, $content, FILE_APPEND);
} else {
    $csv = fopen($file, "w") or die("Unable to create CSV!");
    fwrite($csv, $content);
    fclose($csv);
}

# Create PDF from HTML Template
$htmlTemplate = fopen("../assets/templates/guestInvitationTemplate.html", "r") or die("Unable to open template!");
$htmlContent = fread($htmlTemplate, filesize("../assets/templates/guestInvitationTemplate.html"));
$htmlContent = str_replace("{{guestFirstName}}", $firstName, $htmlContent);
$htmlContent = str_replace("{{guestLastName}}", $lastName, $htmlContent);
$htmlContent = str_replace("{{logoMM}}", $logoMM, $htmlContent);
$htmlContent = str_replace("{{logoRosie}}", $logoRosie, $htmlContent);

$mpdf = new \Mpdf\Mpdf();
$mpdf->WriteHTML($htmlContent);
$mpdf->Output();
