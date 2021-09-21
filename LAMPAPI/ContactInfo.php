<?php
    header('Access-Control-Allow-Origin: http://connectere.online/'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

$inData = getRequestInfo();

$id = 0;
$Name = "";
$photo = "";
$email = "";
$number = "";
$address = "";
$relationship = "";
$notes = "";


$conn = new mysqli("localhost", "TheBeast", "UCFGROUP14ROCKS", "FINAL"); 	
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT ID, Name, ContactPhoto, Email, PhoneNumber, Address, Relationship, Notes FROM Contacts WHERE ID=?");
    $stmt->bind_param("i", $inData["ID"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc()  )
    {
        returnWithInfo( $row['Name'], $row['ID'], $row['ContactPhoto'], $row['Email'], $row['PhoneNumber'], $row['Address'], $row['Relationship'], $row['Notes']);
    }
    else
    {
        returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError( $err )
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo($Name, $id, $photo, $email, $number, $address, $relationship, $notes)
{
    $retValue = '{"id":' . $id . ',"Name":"' . $Name . '", "email":"'.$email.'", "number":"'.$number.'", "address":"'.$address.'", "relationship":"'.$relationship.'", "note":"'.$notes.'", "photo":"' . $photo . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>